const express = require("express");
const sgMail = require('@sendgrid/mail')
const Survey = require("../models/Survey");
const keys = require("../config/keys");

const router = express.Router();

sgMail.setApiKey(keys.sendgridApiKey)

router.post('/', async (req, res) => {
    try {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => { email }),
            _user: req.user.id,
        })

        const msg = {
            to: 'dishebhb@gmail.com',
            from: 'dishebh27@example.com', // Use the email address or domain you verified above
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };
          console.log('message!!');

        const message = await sgMail.send(msg)
        console.log('message!!', message);

        res.send(survey)
    } catch (err) {
        res.send({ error: err })
    }
})

module.exports = router;
