const bcrypt = require("bcryptjs");
const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});
UserSchema.pre('save', async function(next){
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
