const express= require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./services/stockService')()

app.listen(process.env.PORT || '3000', () => {
  console.log('app is listening on port 3000')
})

require('./routes')(app)