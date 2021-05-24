const db = require('../models')
const { User } = db

module.exports = {
  getForm: async (req, res) => {
    try {
      let { code, name, userId } = req.query
      let user
      if (userId) {
        user = await User.findOne({
          where: {
            userId, code
          }
        })
      }
      const isUser = user ? true : false
      return res.render('form', { code, name, isUser })
    }
    catch (err) {
      console.error(err)
    }
  },
  getFollow: async (req, res) => {
    try {
      let { code, name, isUser } = req.query
      isUser = isUser === 'true' ? true : false
      return res.render('follow', { code, name, isUser })
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
  }
}