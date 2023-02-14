const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
