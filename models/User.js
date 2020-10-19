const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    }
})

module.exports = User = mongoose.model('User', UserSchema)
