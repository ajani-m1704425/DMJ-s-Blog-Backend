const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GoogleUser = require('../Model/GoogleUserModel');

passport.use(new GoogleStrategy({
  clientID: '1047525683035-t3i8k7t7b4i67kfgj5da8fhv7i7mb93t.apps.googleusercontent.com',
  clientSecret: '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',
    callbackURL: '/api/user/auth/google/callback',
    scope: ["profile", "email"],
  
},
    async (accessToken, refreshToken, profile, done) => {
    const user = await GoogleUser.findOne({ googleId: profile.id });
    if (!user) {
        const NEwuser = await GoogleUser.create({
          email: profile.emails[0].value,
          googleId: profile.id,
          displayName:profile.displayName
      })}
    done(null,profile)
    }
   
    ));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});