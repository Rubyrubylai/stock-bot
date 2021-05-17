const linebot = require('linebot')
const { Op } = require('sequelize')
const db = require('../models')
const Technical = db.Technical

module.exports = () => {
  const bot = linebot({
    channelId: process.env.CAHNNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
  })
  
  const linebotParser = bot.parser()
  
  bot.on('message', async(event) => {
    try {
      let text
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
      if (result.length === 1) {
        console.log(result[0].transactionNumber)
        let percentageChange
        switch (result[0].trend) {
          case '-':
            percentageChange = `${((result[0].difference/(result[0].openPrice + result[0].difference))*100).toFixed(2)}%`
            break
          case '+':
            percentageChange = `${((result[0].difference/(result[0].closePrice - result[0].difference))*100).toFixed(2)}%`
            break
          default:
            '0.00%'
        }
        text = 
        `${result[0].code} ${result[0].name}
        成交筆數: ${result[0].transactionNumber}
        開盤價: ${result[0].openPrice}
        最高價: ${result[0].highestPrice}
        最低價: ${result[0].lowestPrice}
        收盤價: ${result[0].closePrice} (${result[0].trend}${result[0].difference}, ${percentageChange})`
      }
      else if (result.length === 0) {
        event.reply('123')
        event.reply({
          type: 'template',
          altText: 'this is a buttons template',
          template: {
            type: 'buttons',
            thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
            title: 'Menu',
            text: 'Please select',
            actions: [{
              type: 'message',
              label: '三大法人',
              text: 'I',
            }, {
              type: 'message',
              label:"按鈕顯示的文字",
              text: 'Add to cart'
            }, {
              type: 'uri',
              label: 'View detail',
              uri: 'http://example.com/page/123'
            }]
          }
        });
      }
      else {
        text = '請輸入您要搜尋的股票: '
        for (const r of result) {
          text += `${r.name}, `
        }
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


