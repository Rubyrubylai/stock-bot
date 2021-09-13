const cheerio = require('cheerio')
const moment = require('moment')
const db = require('../models')
const { Technical, Investor, Security, Basic } = db
const { stringToNumber, stringToNumberDivide } = require('../config/convert')
const { taiwanStockRequest, goodInfoRequest } = require('../config/axios')
class stockTreeNode {
  constructor() {
    this.children = {}
    this.code = 0
  }
}
class stockTree {
  constructor() {
    this.root = new stockTreeNode()
  }

  insert(word, code) {
    let current = this.root
    for (let w of word) {
      if (!current.children[w]) {
        current.children[w] = new stockTreeNode()
      }
      current = current.children[w]
    }
    current.code = code
  }

  startsWith(prefix) {
    let current = this.root
    for (let p of prefix) {
      if (!current.children[p]) return false
      current = current.children[p]
    }
    return current
  }
}
let stocksTree = new stockTree()

module.exports = {
  createTechnical: async (req, res) =>　{
    try {
      const now = moment().format('YYYYMMDD')
      //股價
      let response = await taiwanStockRequest.get(`/exchangeReport/MI_INDEX?response=html&date=${now}&type=ALLBUT0999`)
      let $ = cheerio.load(response.data)
      let table = $('table:nth-child(11) tbody tr')
      if (table.length === 0) { return res.send('今日休市') }
      await Technical.destroy({
        where: {},
        truncate: true
      })
      for (let i=0; i<table.length; i++) {
        const table_td = table.eq(i).find('td')
        const code = table_td.eq(0).text()
        const name = table_td.eq(1).text().trim()
        const transactionNumber= table_td.eq(3).text()
        const transactionAmount = table_td.eq(4).text()
        const openPrice = table_td.eq(5).text()
        const highPrice = table_td.eq(6).text()
        const lowPrice = table_td.eq(7).text()
        const closePrice = table_td.eq(8).text()
        let trend = table_td.eq(9).text()
        const difference = table_td.eq(10).text()
        const PER = table_td.eq(15).text()
        trend = trend === '-' || trend === '+' ? trend : ''
        await Technical.create({
          code: code,
          name: name,
          transactionNumber: stringToNumber(transactionNumber),
          transactionAmount: transactionAmount,
          openPrice: Number(openPrice) ?  Number(openPrice) : null,
          highPrice: Number(highPrice) ?  Number(highPrice) : null,
          lowPrice: Number(lowPrice) ?  Number(lowPrice) : null,
          closePrice: Number(closePrice) ?  Number(closePrice) : null,
          difference: Number(trend + difference),
          PER: Number(PER)
        })
      }
  
      //殖利率
      response = await taiwanStockRequest.get(`/exchangeReport/BWIBBU_d?response=html&date=${now}&selectType=ALL`)
      $ = cheerio.load(response.data)
      table = $('table tbody tr')
      if (table.length === 0) { return res.send('今日休市') }
      for (let i=0; i<table.length; i++) {
        const table_td = table.eq(i).find('td')
        const code = table_td.eq(0).text()
        const dividendYield = table_td.eq(2).text()
        await Technical.update(
          { dividendYield: Number(dividendYield) },
          { where: { code: code } }
        )
      }
      return res.status(200).send('成功')
    }
    catch (err) {
      console.error(err)
    }
  },

  createInvestor: async (req, res) =>　{
    try {
      const now = moment('2021-09-10').format('YYYYMMDD')
      //三大法人
      let response = await taiwanStockRequest.get(`/fund/T86?response=html&date=${now}&selectType=ALLBUT0999`)
      let $ = cheerio.load(response.data)
      let table = $('table tbody tr')
      if (table.length === 0) { return res.send('今日休市') }
      Investor.destroy({
        where: {},
        truncate: true
      })
      for (let i=0; i<table.length; i++) {
        const table_td = table.eq(i).find('td')
        const code = table_td.eq(0).text()
        const name = table_td.eq(1).text().trim()
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
      return res.status(200).send('成功')
    }
    catch (err) {
      console.error(err)
    }
  },

  createSecurity: async (req, res) =>　{
    try {
      const now = moment().format('YYYYMMDD')
      //融資、融券
      let response = await taiwanStockRequest.get(`/exchangeReport/MI_MARGN?response=html&date=${now}&selectType=STOCK`)
      let $ = cheerio.load(response.data)
      let table = $('table tbody tr')
      if (table.length === 0) { return res.send('今日休市') }
      Security.destroy({
        where: {},
        truncate: true
      })
      for (let i=1; i<table.length; i++) {
        const table_td = table.eq(i).find('td')
        const code = table_td.eq(0).text()
        const name = table_td.eq(1).text().trim()
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
      response = await taiwanStockRequest.get(`/exchangeReport/TWT93U?response=html&date=${now}`)
      $ = cheerio.load(response.data)
      table = $('table tbody tr')
      if (table.length === 0) { return res.send('今日休市') }
      for (let i=0; i<table.length-1; i++) {
        const table_td = table.eq(i).find('td')
        const code = table_td.eq(0).text()
        const name = table_td.eq(1).text().trim()
        const loanYesterdayNumber = table_td.eq(8).text()
        const loanTodayNumber = table_td.eq(12).text()
        let security = await Security.update(
          {
            loanYesterdayNumber: stringToNumberDivide(loanYesterdayNumber),
            loanTodayNumber: stringToNumberDivide(loanTodayNumber)
          },
          { where: { code: code } }
        )
        if (security[0] === 0) {
          await Security.create({
            code: code,
            name: name,
            loanYesterdayNumber: stringToNumberDivide(loanYesterdayNumber),
            loanTodayNumber: stringToNumberDivide(loanTodayNumber)
          })
        }
      }
  
      //當沖
      response = await taiwanStockRequest.get(`/exchangeReport/TWTB4U?response=html&date=${now}&selectType=All`)
      $ = cheerio.load(response.data)
      table = $('table:nth-child(3) tbody tr')
      if (table.length === 0) { return res.send('今日休市') }
      for (let i=0; i<table.length; i++) {
        const table_td = table.eq(i).find('td')
        const code = table_td.eq(0).text()
        const name = table_td.eq(1).text().trim()
        const offsetNumber = table_td.eq(3).text()
        let security = await Security.update(
          { offsetNumber: stringToNumberDivide(offsetNumber) },
          { where: { code: code } }
        )
        if (security[0] === 0) {
          await Security.create({
            code: code,
            name: name,
            offsetNumber: stringToNumberDivide(offsetNumber)
          })
        }
      }
      return res.status(200).send('成功')
    }
    catch (err) {
      console.error(err)
    }
  },

  createBasic: async (stockId) => {
    try {
      let response = await goodInfoRequest.get(`/StockInfo/BasicInfo.asp?STOCK_ID=${stockId}`)
      let $ = cheerio.load(response.data)
      const table = $('table:nth-child(3) tr')
      const code = table.eq(1).find('td:nth-child(2)').text()
      if (code.length === 0) return { message: '找不到符合的條件，請重新輸入'}
      const name = table.eq(1).find('td:nth-child(4)').text().trim()
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
      return { code, industry, listedCompany, capital}
    }
    catch (err) {
      console.error(err)
    }
  },

  listAllStocks: async(req, res) => {
    try {
      let stocks = await Investor.findAll({
        attributes: ['name', 'code'],
        raw: true,
        nest:true
      })

      return res.json({
        data: stocks
      })
    }
    catch (err) {
      console.error(err)
    }
  }
}
