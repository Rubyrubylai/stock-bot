module.exports = {
  getForm: async (req, res) => {
    try {
      console.log(req.query)
      const code = req.query['liff.state'].substring(1)
      return res.render('form', { code })
    }
    catch (err) {
      console.error(err)
    }
  }
}