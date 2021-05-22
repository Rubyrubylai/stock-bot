const express= require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(express.static('public'))

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.unsubscribe(methodOverride('_method'))

app.listen(process.env.PORT || '3000', () => {
  console.log('app is listening on port 3000')
})

require('./routes')(app)