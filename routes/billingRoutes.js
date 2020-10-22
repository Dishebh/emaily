const express = require('express')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);

const router = express.Router()

// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
router.post('/', async (req, res) => {
    stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    })

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user)
})

module.exports = router