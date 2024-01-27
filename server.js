const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GooglePassportStrategy = require("./Controller/GoogleUserController");
const TwitterPassportStrategy = require("./Controller/TwitterUserController")

const userRoute = require('./Routes/UserRoute');


const app = express();

//Middleware
app.use(express.json());
app.use(session({ secret: process.env.SESSION, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());




// route
// Set up Google OAuth routes
app.use(userRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(
   app.listen(process.env.PORT, () => {
    console.log("Server is listening")
   })
).catch((error) => 
console.log(error))
