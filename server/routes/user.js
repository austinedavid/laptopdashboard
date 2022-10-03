const express = require('express')
const route = express.Router()
const {signIn,signUp,withEmail, getusers} = require('../controller/user')

// below is our user routes

// create user
route.post('/signup', signUp)

// signin user
route.post('/signin', signIn)

//  loginwith email
route.post('/withemail', withEmail)

//  get all registered users
route.get('/getusers', getusers)

module.exports = route