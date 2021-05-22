const db = require('../models')
const { User } = db

module.exports = {
  getForm: async (req, res) => {
    try {
      const { code, name } = req.query
      return res.render('form', { code, name })
    }
    catch (err) {
      console.error(err)
    }
  },
  getFollow: async (req, res) => {
    try {
      const { code, name } = req.query
      return res.render('follow', { code, name })
    }
    catch (err) {
      console.error(err)
    }
  },
  createFollow: async (req, res) => {
    try {
      const { openPrice, dividendYield, code, userId } = req.body
      await User.create({
        openPrice, dividendYield, code, userId
      })
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