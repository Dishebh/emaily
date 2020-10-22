const express = require('express')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const User = require('../models/User');

const router = express.Router()

// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
router.post('/', requireLogin, async (req, res) => {
    try {
        console.log('CREDITS', user.credits);

        await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id,
            billing_details: {
                address: {
                    city: 'Bahadurgarh',
                    country: 'India'
                },
                name: 'Zero'
            }
        })

        const user = await User.findOneAndUpdate({ googleId: req.user.id }, {
            $inc: { credits: 5 }
        }, {
            new: true
        })

        res.send(user)   
    } catch (err) {
        res.send({ 'ERR!!': err.message });
    }
})

module.exports = router