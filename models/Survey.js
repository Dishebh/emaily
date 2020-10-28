const mongoose = require("mongoose");
const RecipientSchema = require('./Recipient');

const SurveySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  subject: {
    type: String,
  },
  recipients: [RecipientSchema],
  yes: {
      type: Number,
      default: 0
  },
  no: {
    type: Number,
    default: 0
    },
  _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  dateSent: {
      type: Date,
      default: Date.now()
  }
});

const Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;
