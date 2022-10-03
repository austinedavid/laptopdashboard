const mongoose = require('mongoose')

const stripeSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("stripePay", stripeSchema)