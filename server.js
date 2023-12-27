const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoute = require('./Routes/UserRoute');

const app = express();

//Middleware
app.use(express.json());

// route
app.use('/api/user', userRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(
   app.listen(process.env.PORT, () => {
    console.log("Server is listening")
   })
).catch((error) => 
console.log(error))
