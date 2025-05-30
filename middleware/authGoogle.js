const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Aqui está o que será passado no req.user no callback
      return done(null, {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      });
    }
  )
);

module.exports = passport;
