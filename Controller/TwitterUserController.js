const TwitterUser = require('../Model/TwitterUserModel');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
  consumerKey: "8PVbj20skHgmK2gG92OcbgcWk",
    consumerSecret: "oEPdpgHG2lROSijTSTV7lfy9SuZFdp5SM063EwEL6LwCJcWEYZ",
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
