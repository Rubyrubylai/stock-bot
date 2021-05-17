const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const axios = require('axios')
const botService = require('../services/botService')
const linebotParser = botService()
const db = require('../models')
const Stock = db.Stock

router.get('/', async (req, res) =>　{
  try {
    let response = await axios({
      method: 'GET',
      url: 'https://www.twse.com.tw/exchangeReport/MI_INDEX?response=html&date=20210514&type=ALLBUT0999'
    })
    const $ = cheerio.load(response.data)
    const table = $('table:nth-child(11) tbody tr')
    for (let i=1; i<table.length; i++) {
      const table_td = table.eq(i).find('td')
      const code = table_td.eq(0).text()
      const name = table_td.eq(1).text()
      const transactionNumber= table_td.eq(3).text()
      const transactionAmount = table_td.eq(4).text()
      const openPrice = table_td.eq(5).text()
      const highestPrice = table_td.eq(6).text()
      const lowestPrice = table_td.eq(7).text()
      const closePrice = table_td.eq(8).text()
      const trend = table_td.eq(9).text()
      const difference = table_td.eq(10).text()
      const PER = table_td.eq(15).text()
      await Stock.create({
        code: code,
        name: name,
        transactionNumber: transactionNumber,
        transactionAmount: transactionAmount,
        openPrice: Number(openPrice),
        highestPrice: Number(highestPrice),
        lowestPrice: Number(lowestPrice),
        closePrice: Number(closePrice),
        trend: trend,
        difference: Number(difference),
        PER: PER
      })
    }
    return res.send('成功')
  }
  catch (err) {
    console.error(err)
  }
})

router.post('/', linebotParser)


module.exports = router

