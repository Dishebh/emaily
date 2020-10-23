const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  responded: {
    type: Boolean,
    default: false
  }
});

const Recipient = mongoose.model("Recipient", RecipientSchema);

module.exports = Recipient;
