const linebot = require('linebot')
const { Op } = require('sequelize')
const db = require('../models')
const { Technical, Investor, Security, Basic, User } = db
const { difference, toLocaleString } = require('../config/convert')
const stockService = require('./stockService')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bot = linebot({
  channelId: process.env.CAHNNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
const linebotParser = bot.parser()

module.exports = {
  replyMessage: () => {   
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
            const userId = event.source.userId
            const name = encodeURI(result[0].name)
            text = {
              type: 'flex',
              altText: '股票選單',
              contents: {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選單',
                      weight: 'bold',
                      size: 'xl',
                      margin: 'md'
                    },
                    {
                      type: 'text',
                      text: '請選擇您要查看的項目',
                      margin: 'md'
                    },
                    {
                      type: 'spacer'
                    }
                  ]
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'button',
                      action: {
                        type: 'message',
                        label: '今日股價',
                        text: `T${code}`
                      },
                      height: 'sm'
                    },
                    {
                      type: 'button',
                      action: {
                        type: 'message',
                        label: '三大法人',
                        text: `I${code}`,
                      },
                      height: 'sm'
                    },
                    {
                      type: 'button',
                      action: {
                        type: 'message',
                        label: '融資、融券、借券賣、當沖',
                        text: `S${code}`
                      },
                      height: 'sm'
                    },
                    {
                      type: 'button',
                      action: {
                        type: 'message',
                        label: '基本面',
                        text: `B${code}`
                      }
                    },{
                      type: 'button',
                      action: {
                        type: 'uri',
                        label: '追蹤',
                        uri: `https://liff.line.me/${process.env.liffId}?code=${code}&name=${name}&userId=${userId}`
                      },
                      height: 'sm'
                    }
                  ],
                  flex: 0
                },
                styles: {
                  footer: {
                    separator: true
                  }
                }
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
                if (!result) { text = '找不到符合的條件，請重新輸入' }
                else {
                  const percentageChange = result.difference ? `${Math.round((result.difference/(result.openPrice + result.difference))*100)/100}%` : (result.difference === 0 ? '0.00%' : '--')
                  text = 
                  `${result.code} ${result.name}` + '\n' +
                  `成交筆數: ${toLocaleString(result.transactionNumber)}` + '\n' +
                  `開盤價: ${toLocaleString(result.openPrice)}` + '\n' +
                  `最高價: ${toLocaleString(result.highPrice)}` + '\n' +
                  `最低價: ${toLocaleString(result.lowPrice)}` + '\n' +
                  `收盤價: ${toLocaleString(result.closePrice)} (${result.difference}, ${percentageChange})`
                }
                break
              case 'I':
                const codeI = event.message.text.substr(1)
                result = await Investor.findOne({
                  where: {
                    code: codeI
                  }
                })
                if (!result) { text = '找不到符合的條件，請重新輸入' }
                else {
                  const foreignDifferenceNumber = difference(result.foreignBuyNumber - result.foreignSellNumber)
                  const investmentDifferenceNumber = difference(result.investmentBuyNumber - result.investmentSellNumber)
                  const dealerDifferenceNumber = difference(result.dealerBuyNumber - result.dealerSellNumber)
                  text = 
                  `${result.code} ${result.name}` + '\n' +
                  `外資買入張數: ${toLocaleString(result.foreignBuyNumber)}` + '\n' +
                  `外資賣出張數: ${toLocaleString(result.foreignSellNumber)}` + '\n' +
                  `外資買賣超: ${foreignDifferenceNumber}` + '\n' +
                  '----------------' + '\n' +
                  `投信買入張數: ${toLocaleString(result.investmentBuyNumber)}` + '\n' +
                  `投信賣出張數: ${toLocaleString(result.investmentSellNumber)}` + '\n' +
                  `投信買賣超: ${investmentDifferenceNumber}` + '\n' +
                  '----------------' + '\n' +
                  `自營商買數張數: ${toLocaleString(result.dealerBuyNumber)}` + '\n' +
                  `自營商賣出張數: ${toLocaleString(result.dealerSellNumber)}` + '\n' +
                  `自營商買賣超: ${dealerDifferenceNumber}`
                }
                break
              case 'S':
                const codeS = event.message.text.substr(1)
                result = await Security.findOne({
                  where: {
                    code: codeS
                  }
                })
                if (!result) { text = '找不到符合的條件，請重新輸入'}
                else {
                  const marginDifferenceNumber = difference(result.marginTodayNumber - result.marginYesterdayNumber)
                  const shortSaleDifferenceNumber = difference(result.shortSaleTodayNumber - result.shortSaleYesterdayNumber)
                  const loanDifferenceNumber = difference(result.loanTodayNumber - result.loanYesterdayNumber)
                  text = 
                  `${result.code} ${result.name}` + '\n' +
                  `融資: ${marginDifferenceNumber}` + '\n' +
                  `融券: ${shortSaleDifferenceNumber}` + '\n' +
                  `借券: ${loanDifferenceNumber}` + '\n' +
                  `當沖: ${difference(result.offsetNumber)}`
                }
                break
              case 'B':
                const codeB = event.message.text.substr(1)
                result = await Basic.findOne({
                  where: { code: codeB },
                  include: {
                    model: Technical
                  }
                })
                if (result) {
                  result = result.toJSON()
                  text = 
                  `${result.code} ${result.Technical.name}` + '\n' +
                  `產業別: ${result.industry}, ${result.listedCompany}` + '\n' +
                  `資本額: ${result.capital}` + '\n' +
                  `本益比: ${result.Technical.PER}` + '\n' +
                  `殖利率: ${result.Technical.dividendYield ? result.Technical.dividendYield+'%' : '--'}`
                }
                else {
                  let response = await stockService.createBasic(codeB)
                  if (response.message) { text = response.message }
                  else {
                    result = await Technical.findOne({
                      where: { code: codeB }
                    })
                    text = 
                    `${response.code} ${result.name}` + '\n' +
                    `產業別: ${response.industry}, ${response.listedCompany}` + '\n' +
                    `資本額: ${response.capital}` + '\n' +
                    `本益比: ${result.PER}` + '\n' +
                    `殖利率: ${result.dividendYield ? result.dividendYield+'%' : '--'}`
                  }
                }
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
        console.error(err.message)
      }
    })

    return linebotParser
  },

  pushMessage: async (req, res) => {
    try {
      
      let users = await User.findAll({
        include: [ Technical ],
        raw: true,
        nest: true
      })
      
      let userMap = []
      let userTotal = new Set()
      users.forEach(user => {
        let { userId, code, dividendYield, openPrice } = user
        let message
        if (!userMap[userId]) {
          userMap[userId] = []
        }
        if (openPrice > user.Technical.openPrice && (dividendYield < user.Technical.dividendYield && dividendYield)) { //收盤價及本益比皆符合，且不得為 null
          message =  userMap[userId]
          message += '\n' + `${user.Technical.name}(${user.Technical.code}) 收盤價:${user.Technical.openPrice} 本益比:${user.Technical.dividendYield}`
          userMap[userId] = message
          userTotal.add(userId)
        }
        else if (openPrice > user.Technical.openPrice) {
          message =  userMap[userId]
          message += '\n' + `${user.Technical.name}(${user.Technical.code}) 收盤價:${user.Technical.openPrice}`
          userMap[userId] = message
          userTotal.add(userId)
        }
        else if (dividendYield < user.Technical.dividendYield && dividendYield) {
          message =  userMap[userId]
          message += '\n' + `${user.Technical.name}(${user.Technical.code}) 本益比:${user.Technical.dividendYield}`
          userMap[userId] = message
          userTotal.add(userId)
        }
      })
      
      userTotal.forEach(user => {
        let messageBegin = '小幫手提醒您，以下股票價格已達到您的設定:'
        bot.push(user, messageBegin + userMap[user])
      })
      return res.send('成功')
    }
    catch (err) {
      console.error(err.message)
    }
  }
} 


