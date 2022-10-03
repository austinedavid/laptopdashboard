const mongoose = require('mongoose')

// creating our user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }, 

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        
    },

    regWithMail:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("LAPTOP_USER", userSchema )