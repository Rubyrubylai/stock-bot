const express = require('express')
const router = express.Router()
const botService = require('../services/botService')
const linebotParser = botService()
const stockService = require('../services/stockService')
const formService = require('../services/formService')

router.get('/technical', stockService.createTechnical)
router.get('/investor', stockService.createInvestor)
router.get('/security', stockService.createSecurity)

router.get('/form', formService.getForm)

router.post('/', linebotParser)

module.exports = router
