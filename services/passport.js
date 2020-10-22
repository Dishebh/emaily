const passportServices = (keys, User, GoogleStrategy, passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile ID
            return done(null, existingUser);
          } else {
            // we don't have a user record with this ID, make a new record!
            const user = new User({ googleId: profile.id }).save();
            return done(null, user);
          }
        });
      }
    )
  );
}

module.exports = passportServices


