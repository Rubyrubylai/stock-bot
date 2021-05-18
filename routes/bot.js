const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const moment = require('moment')
const botService = require('../services/botService')
const linebotParser = botService()
const db = require('../models')
const { Technical, Investor, Security, Basic } = db
const { stringToNumber, stringToNumberDivide } = require('../config/convert')
const { taiwanStockRequest, goodInfoRequest } = require('../config/axios')

router.get('/technical', async (req, res) =>　{
  try {
    await Technical.destroy({
      where: {},
      truncate: true
    })

    const now = moment('2021-05-17').format('YYYYMMDD')
    
    let response = await taiwanStockRequest.get(`/exchangeReport/MI_INDEX?response=html&date=${now}&type=ALLBUT0999`)
    let $ = cheerio.load(response.data)
    const table = $('table:nth-child(11) tbody tr')
    for (let i=0; i<table.length; i++) {
      const table_td = table.eq(i).find('td')
      const code = table_td.eq(0).text()
      const name = table_td.eq(1).text()
      const transactionNumber= table_td.eq(3).text()
      const transactionAmount = table_td.eq(4).text()
      const openPrice = table_td.eq(5).text()
      const highPrice = table_td.eq(6).text()
      const lowPrice = table_td.eq(7).text()
      const closePrice = table_td.eq(8).text()
      const trend = table_td.eq(9).text()
      const difference = table_td.eq(10).text()
      const PER = table_td.eq(15).text()
      await Technical.create({
        code: code,
        name: name,
        transactionNumber: stringToNumber(transactionNumber),
        transactionAmount: transactionAmount,
        openPrice: Number(openPrice) || null,
        highPrice: Number(highPrice) || null,
        lowPrice: Number(lowPrice) || null,
        closePrice: Number(closePrice) || null,
        trend: trend,
        difference: Number(difference) || null,
        PER: Number(PER) || null
      })
    }

    //殖利率
    let responseYield = await taiwanStockRequest.get(`/exchangeReport/BWIBBU_d?response=html&date=${now}&selectType=ALL`)
    let $Y = cheerio.load(responseYield.data)
    const tableYield = $Y('table tbody tr')
    for (let i=0; i<tableYield.length; i++) {
      const table_td = tableYield.eq(i).find('td')
      const code = table_td.eq(0).text()
      const dividendYield = table_td.eq(2).text()
      await Technical.update(
        { dividendYield: Number(dividendYield) || null },
        { where: { code: code } }
      )
    }
    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.get('/investor', async (req, res) =>　{
  try {
    Investor.destroy({
      where: {},
      truncate: true
    })

    //三大法人
    const now = moment('2021-05-17').format('YYYYMMDD')
    let response = await taiwanStockRequest.get(`/fund/T86?response=html&date=${now}&selectType=ALLBUT0999`)
    const $ = cheerio.load(response.data)
    const table = $('table tbody tr')
    for (let i=0; i<table.length; i++) {
      const table_td = table.eq(i).find('td')
      const code = table_td.eq(0).text()
      const name = table_td.eq(1).text()
      const foreignBuyNumber = table_td.eq(2).text()
      const foreignSellNumber = table_td.eq(3).text()
      const investmentBuyNumber = table_td.eq(8).text()
      const investmentSellNumber = table_td.eq(9).text()
      const dealerBuyNumber = table_td.eq(12).text()
      const dealerSellNumber = table_td.eq(13).text()
      await Investor.create({
        code: code,
        name: name,
        foreignBuyNumber: stringToNumberDivide(foreignBuyNumber),
        foreignSellNumber: stringToNumberDivide(foreignSellNumber),
        investmentBuyNumber: stringToNumberDivide(investmentBuyNumber),
        investmentSellNumber: stringToNumberDivide(investmentSellNumber),
        dealerBuyNumber: stringToNumberDivide(dealerBuyNumber),
        dealerSellNumber: stringToNumberDivide(dealerSellNumber),
      })
    }
    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.get('/security', async (req, res) =>　{
  try {
    Security.destroy({
      where: {},
      truncate: true
    })

    //融資、融券
    const now = moment('2021-05-17').format('YYYYMMDD')
    let response = await taiwanStockRequest.get(`/exchangeReport/MI_MARGN?response=html&date=20210517&selectType=STOCK`)
    const $ = cheerio.load(response.data)
    const table = $('table tbody tr')
    for (let i=1; i<table.length; i++) {
      const table_td = table.eq(i).find('td')
      const code = table_td.eq(0).text()
      const name = table_td.eq(1).text()
      const marginYesterdayNumber = table_td.eq(5).text()
      const marginTodayNumber = table_td.eq(6).text()
      const shortSaleYesterdayNumber = table_td.eq(11).text()
      const shortSaleTodayNumber = table_td.eq(12).text()
      await Security.create({
        code: code,
        name: name,
        marginYesterdayNumber: stringToNumber(marginYesterdayNumber),
        marginTodayNumber: stringToNumber(marginTodayNumber),
        shortSaleYesterdayNumber: stringToNumber(shortSaleYesterdayNumber),
        shortSaleTodayNumber: stringToNumber(shortSaleTodayNumber),
      })
    }

    //借券賣
    let responseLoan = await taiwanStockRequest.get(`/exchangeReport/TWT93U?response=html&date=${now}`)
    let $L = cheerio.load(responseLoan.data)
    const tableLoan = $L('table tbody tr')
    for (let i=0; i<tableLoan.length-1; i++) {
      const table_td = tableLoan.eq(i).find('td')
      const code = table_td.eq(0).text()
      const name = table_td.eq(1).text()
      const loanYesterdayNumber = table_td.eq(8).text()
      const loanTodayNumber = table_td.eq(12).text()
      let security = await Security.update(
        {
          loanYesterdayNumber: stringToNumber(loanYesterdayNumber),
          loanTodayNumber: stringToNumber(loanTodayNumber)
        },
        { where: { code: code } }
      )
      if (security[0] === 0) {
        await Security.create({
          code: code,
          name: name,
          loanYesterdayNumber: stringToNumber(loanYesterdayNumber),
          loanTodayNumber: stringToNumber(loanTodayNumber)
        })
      }
    }

    //當沖
    let responseOffset = await taiwanStockRequest.get(`/exchangeReport/TWTB4U?response=html&date=${now}&selectType=All`)
    let $O = cheerio.load(responseOffset.data)
    const tableOffset = $O('table:nth-child(3) tbody tr')
    for (let i=0; i<tableOffset.length; i++) {
      const table_td = tableOffset.eq(i).find('td')
      const code = table_td.eq(0).text()
      const name = table_td.eq(1).text()
      const offsetNumber = table_td.eq(3).text()
      let security = await Security.update(
        { offsetNumber: stringToNumber(offsetNumber) },
        { where: { code: code } }
      )
      if (security[0] === 0) {
        await Security.create({
          code: code,
          name: name,
          offsetNumber: stringToNumber(offsetNumber)
        })
      }
    }

    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.get('/basic', async (req, res) => {
  try {
    const stockId = 2330
    let response = await goodInfoRequest.get(`/StockInfo/BasicInfo.asp?STOCK_ID=${stockId}`)
    let $ = cheerio.load(response.data)
    const table = $('table:nth-child(5) tr td:nth-child(3) table:nth-child(3) tr')
    const code = table.eq(1).find('td:nth-child(2)').text()
    const name = table.eq(1).find('td:nth-child(4)').text()
    const industry = table.eq(2).find('td:nth-child(2)').text()
    const listedCompany = table.eq(2).find('td:nth-child(4)').text()
    const capital = table.eq(7).find('td:nth-child(2)').text()
    await Basic.create({
      code: code,
      name: name,
      industry: industry,
      listedCompany: listedCompany,
      capital: capital
    })
    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.post('/', linebotParser)


module.exports = router

