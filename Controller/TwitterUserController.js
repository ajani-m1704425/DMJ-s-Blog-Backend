const TwitterUser = require('../Model/TwitterUserModel');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
  consumerKey: "b9ASBGZmkkvx4hryxmc8PFdvO",
    consumerSecret: "7zT6icEbm5rC4cxVw8gFmolXUDlyb7AQC1mO2HQ8b6WdEDTAu2",
  callbackURL: '/api/user/auth/twitter/callback',
  scope: ["profile"],
},
async (accessToken, refreshToken, profile, done) => {
    const user = await TwitterUser.findOne({ twitterId: profile.id });
    if (!user) {
        const NEwuser = await TwitterUser.create({
          twitterId: profile.id,
          displayName:profile.displayName
      })}
    done(null,profile)
    }));
