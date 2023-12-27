const User = require('../Model/UserModel');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: '400212819108680',
  clientSecret: '5de77c4968a98de3a6fcf674fdd39436',
  callbackURL: '/api/user/auth/facebook/callback',
  scope: ["profile", "email"],
},
(accessToken, refreshToken, profile, done) => {
  // Check if user exists in the database, or create a new user
//   User.findOne({ facebookId: profile.id }, (err, user) => {
//     if (err) return done(err);
//     if (!user) {
//       user = new User({
//         facebookId: profile.id,
//         displayName: profile.displayName,
//         // You can add more user data from the Facebook profile if needed
//       });
//       user.save((err) => {
//         if (err) console.error(err);
//         return done(err, user);
//       });
//     } else {
//       return done(err, user);
//     }
    //   });
    console.log(profile)
}));
