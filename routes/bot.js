const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const axios = require('axios')
const moment = require('moment')
const botService = require('../services/botService')
const linebotParser = botService()
const db = require('../models')
const { Technical, Investor, Securities } = db

router.get('/technical', async (req, res) =>　{
  try {
    await Technical.destroy({
      where: {},
      truncate: true
    })

    const now = moment('2021-05-14').format('YYYYMMDD')
    console.log(now)
    let response = await axios({
      method: 'GET',
      url: `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=html&date=${now}&type=ALLBUT0999`
    })
    let $ = cheerio.load(response.data)
    const table = $('table:nth-child(11) tbody tr')
    for (let i=1; i<table.length; i++) {
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
        transactionNumber: transactionNumber,
        transactionAmount: transactionAmount,
        openPrice: Number(openPrice),
        highPrice: Number(highPrice),
        lowPrice: Number(lowPrice),
        closePrice: Number(closePrice),
        trend: trend,
        difference: Number(difference),
        PER: Number(PER)
      })
    }

    let responseYield = await axios({
      method: 'GET',
      url: `https://www.twse.com.tw/exchangeReport/BWIBBU_d?response=html&date=${now}&selectType=ALL`
    })
    $ = cheerio.load(responseYield.data)
    const tableYield = $('table')
    for (let i=1; i<tableYield.length; i++) {
      const table_tr = tableYield.eq(i).find('tR')
      const code = table_tr.eq(0).text()
      const dividendYield = table_tr.eq(2).text()
      await Technical.findOne({
        dividendYield: dividendYield,
        where: {
          code: code
        }
      })
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

    const now = moment('2021-05-14').format('YYYYMMDD')
    let response = await axios({
      method: 'GET',
      url: `https://www.twse.com.tw/fund/T86?response=html&date=${now}&selectType=ALLBUT0999`
    })
    const $ = cheerio.load(response.data)
    const table = $('tbody')
    for (let i=1; i<table.length; i++) {
      const table_tr = table.eq(i).find('tr')
      const foreignBuyNumber = table_tr.eq(2).text()
      const foreignSellNumber = table_tr.eq(3).text()
      const investmentBuyNumber = table_tr.eq(8).text()
      const investmentSellNumber = table_tr.eq(9).text()
      const dealerBuyNumber = table_tr.eq(12).text()
      const dealerSellNumber = table_tr.eq(13).text()
      await Investor.create({
        foreignBuyNumber: Number(foreignBuyNumber),
        foreignSellNumber: Number(foreignSellNumber),
        investmentBuyNumber: Number(investmentBuyNumber),
        investmentSellNumber: Number(investmentSellNumber),
        dealerBuyNumber: Number(dealerBuyNumber),
        dealerSellNumber: Number(dealerSellNumber),
      })
    }
    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.get('/securities', async (req, res) =>　{
  try {
    Securities.destroy({
      where: {},
      truncate: true
    })

    const now = moment('2021-05-14').format('YYYYMMDD')
    let response = await axios({
      method: 'GET',
      url: `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=html&date=${now}&type=ALLBUT0999`
    })
    const $ = cheerio.load(response.data)
    const table = $('table:nth-child(11) tbody tr')
    for (let i=1; i<table.length; i++) {
      const table_td = table.eq(i).find('td')
      const marginYesterdayNumber = table_tr.eq(0).text()
      const marginTodayNumber = table_tr.eq(1).text()
      const shortSaleYesterdayNumber= table_tr.eq(3).text()
      const shortSaleTodayNumber = table_tr.eq(4).text()
      const loanYesterdayNumber = table_tr.eq(5).text()
      const loanTodayNumber = table_tr.eq(6).text()
      const offsetNumber = table_tr.eq(7).text()
      // await Technical.create({
      //   code: code,
      //   name: name,
      //   transactionNumber: transactionNumber,
      //   transactionAmount: transactionAmount,
      //   openPrice: Number(openPrice),
      //   highPrice: Number(highestPrice),
      //   lowPrice: Number(lowestPrice),
      //   closePrice: Number(closePrice),
      //   trend: trend,
      //   difference: Number(difference),
      //   PER: Number(PER)
      // })
    }
    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.post('/', linebotParser)


module.exports = router

