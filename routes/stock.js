const express = require('express')
const router = express.Router()
const botController = require('../controller/botController')
const linebotParser = botController.replyMessage()
const stockController = require('../controller/stockController')
const formController = require('../controller/formController')

router.get('/technical', stockController.createTechnical)
router.get('/investor', stockController.createInvestor)
router.get('/security', stockController.createSecurity)
router.get('/listAllStocks', stockController.listAllStocks)

router.get('/form', formController.getForm)
router.post('/follow', formController.createFollow)
router.put('/follow', formController.updateFollow)
router.delete('/follow', formController.removeFollow)

router.get('/list', formController.getList)
router.get('/directToList', formController.directToList)

router.post('/', linebotParser)
router.get('/push', botController.pushMessage)

module.exports = router

