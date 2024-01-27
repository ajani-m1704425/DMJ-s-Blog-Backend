const express = require('express');
const router = express.Router();
const passport = require('passport');

const { signupUser, loginUser, successLogin } = require('../Controller/UserController');



router.post('/api/user/signup', signupUser);

router.post('/api/user/login', loginUser);

router.get("/login/success", successLogin);

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get('/api/user/auth/twitter',
  passport.authenticate('twitter', { scope: ['profile'] }));

router.get('/api/user/auth/twitter/callback',
  passport.authenticate('twitter', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed'
  })
);


router.get('/api/user/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/api/user/auth/google/callback',
    passport.authenticate("google", {
		successRedirect: "/login/success",
		failureRedirect: "/login/failed",
	})
 );

module.exports = router;
