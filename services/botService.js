const linebot = require('linebot')
const { Op } = require('sequelize')
const db = require('../models')
const { Technical, Investor, Security, Basic } = db

module.exports = () => {
  const bot = linebot({
    channelId: process.env.CAHNNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
  })
  
  const linebotParser = bot.parser()
  
  bot.on('message', async(event) => {
    try {
      let result = await Technical.findAll({
        raw: true,
        nest: true,
        where: {
          [Op.or]: [
            { name: { 
              [Op.like]: `%${event.message.text}%` 
            } }, 
            { code: event.message.text }
          ]
        }
      })

      let text
      switch (result.length) {
        case 1:
          const code = result[0].code
          text = {
            type: 'template',
            altText: 'this is a buttons template',
            template: {
              type: 'buttons',
              title: '選單',
              text: '請選擇您要觀看的項目',
              actions: [{
                type: 'message',
                label: '技術面',
                text: `T${code}`,
              }, {
                type: 'message',
                label: '三大法人',
                text: `I${code}`,
              }, {
                type: 'message',
                label: '融資、融券、借券賣、當沖',
                text: `S${code}`
              }, {
                type: 'message',
                label: '基本面',
                text: `B${code}`
              }]
            }
          }
          break
        case 0:
          switch (event.message.text[0]){
            case 'T':
              const codeT = event.message.text.substr(1)
              result = await Technical.findOne({
                where: { 
                    code: codeT
                } 
              })
              result = result.toJSON()
              let percentageChange
              switch (result.trend) {
                case '-':
                  percentageChange = `${Math.round((result.difference/(result.openPrice + result.difference))*100)/100}%`
                  break
                case '+':
                  percentageChange = `${Math.round((result.difference/(result.closePrice - result.difference))*100)/100}%`
                  break
                default:
                  '0.00%'
              }
              text = 
              `${result.code} ${result.name}
              成交筆數: ${result.transactionNumber}
              開盤價: ${result.openPrice}
              最高價: ${result.highPrice}
              最低價: ${result.lowPrice}
              收盤價: ${result.closePrice} (${result.trend}${result.difference}, ${result.trend}${percentageChange})`
              break
            case 'I':
              const codeI = event.message.text.substr(1)
              result = await Investor.findAll({
                where: {
                  code: codeI
                }
              })
              result = result.toJSON()
              const foreignDifferenceNumber = result.foreignBuyNumber - result.foreignSellNumber
              const investmentDifferenceNumber = result.investmentBuyNumber - result.investmentSellNumber
              const dealerDifferenceNumber = result.dealerBuyNumber - result.dealerSellNumber
              text = 
              `${result.code} ${result.name}
              外資買入張數: ${result.foreignBuyNumber}
              外資賣出張數: ${result.foreignSellNumber}
              外資買賣超: ${foreignDifferenceNumber}
              ----------------
              投信買入張數: ${result.investmentBuyNumber}
              投信賣出張數: ${result.investmentSellNumber}
              投信買賣超: ${investmentDifferenceNumber}
              ----------------
              自營商買數張數: ${result.dealerBuyNumber}
              自營商賣出張數: ${result.dealerSellNumber}
              自營商買賣超: ${dealerDifferenceNumber}`
              break
            default:
              text = '找不到符合的條件，請重新輸入'
              break
          }
          break
        default:
          text = '請輸入您要搜尋的股票: '
          for (const r of result) {
            text += `${r.name}, `
          }
          break
      }
      return event.reply(text)
    }
    catch (err) {
      console.log(err.message)
    }
  })

  bot.on('postback', async(event) => {
    try {
      console.log('---postback')
      console.log(event)
      event.reply('你好')
    }
    catch (err) {
      console.log(err.message)
    }
  })

  return linebotParser
}


