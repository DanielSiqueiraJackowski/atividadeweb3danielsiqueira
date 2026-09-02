const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const cepRoutes = require('./cepRoutes')

router.use('/users', userRoutes)
router.use('/', cepRoutes)

module.exports = router