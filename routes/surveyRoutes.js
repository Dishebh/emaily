const express = require("express");
const Survey = require("../models/Survey");

const router = express.Router();

router.post('/', (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => { email }),
        _user: req.user.id,
    })

    res.send(survey)
})

module.exports = router;
