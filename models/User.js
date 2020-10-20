const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
