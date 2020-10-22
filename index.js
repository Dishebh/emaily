const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser')
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const passportServices = require('./services/passport')

const app = express();

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"));

app.use(bodyParser.json());

app.use(morgan("dev"));

passportServices(keys, User, GoogleStrategy, passport)

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/authRouter"));
app.use("/api/stripe", require("./routes/billingRoutes"));

const PORT = keys.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
