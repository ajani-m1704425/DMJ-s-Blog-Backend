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
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const loginUser = async  (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const successLogin = async (req, res) => {
    console.log(req)
    if (req.user) {
        try {
            const Guser = await GoogleUser.findOne({ googleId: req.user })
            const Tuser = await TwitterUser.findOne({ twitterId: req.user })

            if (!Guser & !Tuser) {
                throw Error("User does not exist");
            }

            const token = createToken(req.user);
            if (Guser) {
                res.status(200).json({
                Guser,
                token
            })
            }
             if (Tuser) {
                res.status(200).json({
                Tuser,
                token
            })
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