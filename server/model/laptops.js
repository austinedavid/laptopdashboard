const mongoose = require('mongoose')

// creating our schema for latops
const laptopSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    laptopImg: {
        type: String,
        required: true,
    },
    laptopDesc: {
        type: String,
        required: true,
    },
    laptopName: {
        type: String,
        required: true
    },
    laptopRatting: {
        type: String,
        required: true
    },
    laptopPrice: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("LAPTOPS", laptopSchema)