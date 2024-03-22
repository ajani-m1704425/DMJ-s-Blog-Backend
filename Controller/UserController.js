const User = require('../Model/UserModel');
const GoogleUser = require("../Model/GoogleUserModel")
const TwitterUser = require("../Model/TwitterUserModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRETKEY, {expiresIn: '10h'})
}

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const loginUser = async  (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const successLogin = async (req, res) => {
      
    if (req.user) {
        try {
            const Guser = await GoogleUser.findOne({ googleId: req.user })
            const Tuser = await TwitterUser.findOne({ twitterId: req.user })

            if (!Guser & !Tuser) {
                throw Error("User does not exist");
            }

            const token = createToken(req.user);
            if (Guser) {
                const origin = "https://dmj-s-blog.vercel.app";
                // Set CORS headers dynamically based on the request's origin
                res.header('Access-Control-Allow-Origin', origin);
                // Send a JSON response with the redirect URL
                res.status(200)
                res.redirect(`${origin}?user=${encodeURIComponent(JSON.stringify({Guser,token}))}`);
            }
            if (Tuser) {
                const origin = "https://dmj-s-blog.vercel.app";
                // Set CORS headers dynamically based on the request's origin
                res.header('Access-Control-Allow-Origin', origin);
                // Send a JSON response with the redirect URL
                res.status(200)
                res.redirect(`${origin}?user=${encodeURIComponent(JSON.stringify({Tuser,token}))}`);
            }
            
        }catch (error) {
        res.status(400).json({error: error.message})
    }
    }
    else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
	} 

module.exports = {loginUser,signupUser,successLogin}