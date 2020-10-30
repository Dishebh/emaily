const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const passportServices = require("./services/passport");

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

if (process.env.NODE_ENV === 'development') {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

passportServices(keys, User, GoogleStrategy, passport);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/authRoutes"));
app.use("/api/stripe", require("./routes/billingRoutes"));
app.use("/api/surveys", require("./routes/surveyRoutes"));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static('client/build'))

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
