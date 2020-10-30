const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const express = require("express");
const sgMail = require("@sendgrid/mail");
const Survey = require("../models/Survey");
const keys = require("../config/keys");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const router = express.Router();

sgMail.setApiKey(keys.sendgridApiKey);

router.get("/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting!");
});

router.post("/webhooks", (req, res) => {
  console.log("webhooks body: ", req.body);

  const p = new Path("/api/surveys/:surveyId/:choice");

  const events = _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);

      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value()

  console.log('events: ', events);

  res.send("webhook called!");
});

router.post("/", async (req, res) => {
  try {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email })),
      _user: req.user.id,
    });

    await survey.save();

    const toEmails = survey.recipients.map(({ email }) => email);

    const msg = {
      to: toEmails,
      from: "dishebh27@gmail.com", // Use the email address or domain you verified above
      subject: subject,
      html: surveyTemplate(survey),
    };

    await sgMail.send(msg);

    res.send(survey);
  } catch (err) {
    console.error("Error!!", err);
    res.send({ error: err.response.body.errors });
  }
});

module.exports = router;
