const express = require('express')

const router = express.Router()

const userRoutes = require('./userRoutes')
const cepRoutes = require('./cepRoutes')

router.use('/usuarios', userRoutes)
router.use('/', cepRoutes)

module.exports = router