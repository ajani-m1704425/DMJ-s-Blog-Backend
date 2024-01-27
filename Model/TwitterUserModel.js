const mongoose = require('mongoose');

const Schema = mongoose.Schema

const TwitterUserSchema = new Schema({
    twitterId: {
        type: String,
        require:true
    },
    displayName: {
        type: String,
        require:true
    },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('TwitterUser', TwitterUserSchema);