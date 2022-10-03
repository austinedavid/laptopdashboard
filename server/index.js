const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
dotenv.config()
const cors = require('cors')
const userRoute = require('./routes/user')
const laptopRoute = require('./routes/laptops')
const paymentRoute = require('./routes/stripe')
// connecting to mongo DB
const connectingDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO__URL).then(res=>console.log("connected to atlass"))
    } catch (error) {
        console.log(error)
    }
    
}

// creating our port 
const PORT = process.env.PORT || 8000


// using some middleware
app.use(express.json())
app.use(cors())

// our routes below here
app.use('/api', userRoute)
app.use('/api', laptopRoute)
app.use('/api', paymentRoute)
// app listening below
app.listen(PORT, ()=>{
    console.log(`app running on port: ${PORT}`)
    connectingDB()
})