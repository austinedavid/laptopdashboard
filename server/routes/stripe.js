const express = require('express')
const route = express.Router()
const {stripePay, getPurchases} = require('../controller/stripe')
// creating our route for stripe payment
route.post('/stripe', stripePay)
route.get('/payments/:id', getPurchases)

module.exports = route