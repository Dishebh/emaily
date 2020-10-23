const mongoose = require("mongoose");

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
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient'
  }],
  yes: {
      type: Number,
      default: 0
  },
  no: {
    type: Number,
    default: 0
}
});

const Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;
