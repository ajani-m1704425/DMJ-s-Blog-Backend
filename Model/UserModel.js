const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

UserSchema.statics.signup = async function (email, password) {
    
    if (!email || !password) {
        throw Error("All field must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

     if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }


    const emailExist = await this.findOne({ email });

    if (emailExist) {
        throw Error("User already existed")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
    
}

UserSchema.statics.login = async function (email, password) {
    
     if (!email || !password) {
        throw Error("All field must be filled")
    }

    const userExist= await this.findOne({ email });

    if (!userExist) {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, userExist.password);

    if (!match) {
        throw Error("Incorrect Password")
    }

    return userExist
    
}
module.exports = mongoose.model('User', UserSchema);