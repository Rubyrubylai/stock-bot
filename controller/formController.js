const { Op } = require('sequelize')
const db = require('../models')
const { User, Technical } = db

module.exports = {
  getForm: async (req, res) => {
    try {
      let { code, name, userId } = req.query
      let user
      if (userId && code) {
        user = await User.findOne({
          where: {
            userId,
            code
          }
        })
      }
      let hasCode = false
      let openPrice
      let dividendYield
      if (user) {
        user = user.toJSON()
        hasCode = true
        openPrice = user.openPrice
        dividendYield = user.dividendYield
      }
 
      return res.render('form', { code, name, userId, openPrice, dividendYield, hasCode })
    }
    catch (err) {
      console.error(err)
    }
  },

  createFollow: async (req, res) => {
    try {
      const { openPrice, dividendYield, code, userId } = req.body

      if (openPrice && dividendYield) {
        await User.create({
          openPrice, dividendYield, code, userId
        })
      }
      else if (openPrice) {
        await User.create({
          openPrice, code, userId
        })
      }
      else if (dividendYield) {
        await User.create({
          dividendYield, code, userId
        })
      }
      return res.send('成功')
    }
    catch (err) {
      console.error(err)
    }
  },

  updateFollow: async (req, res) => {
    try {
      const { openPrice, dividendYield, code, userId } = req.body
      let user = await User.findOne({
        where: {
          userId, code
        }
      })
      if (openPrice && dividendYield) {
        user.update({
          openPrice, dividendYield
        })
      }
      else if (openPrice) {
        user.update({
          openPrice
        })
      }
      else if (dividendYield) {
        user.update({
          dividendYield
        })
      }
      return res.send('成功')
    }
    catch (err) {
      console.error(err)
    }
  },

  removeFollow: async (req, res) => {
    try {
      const { code, userId } = req.body

      let user = await User.findOne({
        where: {
          userId, code
        }
      })

      if (user) {
        await user.destroy()
      }
      return res.send('成功')
    }
    catch (err) {
      console.error(err)
    }
  },

  directToList: async(req, res) => {
    try {
      return res.render('list')
    }
    catch (err) {
      console.error(err)
    }
  },

  getList: async(req, res) => {
    try {
      let { userId } = req.query

      let followingStocks
      if (userId) {
        followingStocks = await User.findAll({
          where: {
            userId
          },
          include: [{ model: Technical, attributes: ['name'] }],
          raw: true,
          nest: true
        })  
      }

      return res.json({
        code: 200,
        data: { followingStocks, userId }
      })
    }
    catch (err) {
      console.error(err)
    }
  }
}