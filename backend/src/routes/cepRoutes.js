const express = require('express')
const router = express.Router()
const cepController = require('../controllers/cepController')

router.get('/api/mensagem', cepController.getMensagem)
router.get('/cep/:cep', cepController.getCepJson)
router.get('/cep/:cep/xml', cepController.getCepXml)
router.get('/cep/:uf/:cidade/:logradouro', cepController.getAddressJson)
router.get('/cep/:uf/:cidade/:logradouro/xml', cepController.getAddressXml)

module.exports = router