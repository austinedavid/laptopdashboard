const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const Stripe = require('../model/stripe')

// creating the controller for the route
const stripePay = async(req, res)=>{
    try {
        const {itemObject, token} = req.body
        // creating our customer stripe
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then((customer)=>{
            // here we craete our charges
            stripe.charges.create({
                amount: itemObject.amount * 100,
                currency: 'usd',
                customer: customer.id,
                description: itemObject.itemNames
            }).then((result)=>{
                res.status(200).json("successful payment done")
                const verifiedBuy =  Stripe.create({
                    userId: itemObject.payerId,
                    products: itemObject.itemNames,
                    totalPrice: itemObject.amount
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
};

// here we get our users purchase
const getPurchases = async(req, res)=>{
    const{id} = req.params
    try {
        const fetchPurchase = await Stripe.find({userId:id})
        res.status(200).json(fetchPurchase)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {stripePay, getPurchases}