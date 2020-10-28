const express = require("express");
const sgMail = require('@sendgrid/mail')
const Survey = require("../models/Survey");
const keys = require("../config/keys");
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const router = express.Router();

sgMail.setApiKey(keys.sendgridApiKey)

router.post('/', async (req, res) => {
    try {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
        })

        await survey.save()

        const toEmails = survey.recipients.map(({ email }) => email);

        const msg = {
            to: toEmails,
            from: 'dishebh27@gmail.com', // Use the email address or domain you verified above
            subject: subject,
            html: surveyTemplate(survey),
          };

        await sgMail.send(msg)

        res.send(survey)
    } catch (err) {
        console.error('Error!!', err);
        res.send({ error: err.response.body.errors })
    }
})

module.exports = router;
