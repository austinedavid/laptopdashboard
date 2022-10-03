const express = require('express')
const route = express.Router()
const {deleteLaptop, updateLaptop, getLaptopAll, getSpec, postLaptop} = require('../controller/laptops')
const {verify} = require('../verification')
// below we create routes of our laptop shopping

// create post of laptops
route.post('/postlaptop', verify, postLaptop)

//  we get all laptops
route.get('/getlaptopall', getLaptopAll)

// we get only one laptop
route.get('/getspec/:id', getSpec)

// update posted laptop
route.put('/updatelaptop/:id', verify, updateLaptop)

// delete a particular laptop
route.delete('/deletelaptop/:id', verify, deleteLaptop)

module.exports = route