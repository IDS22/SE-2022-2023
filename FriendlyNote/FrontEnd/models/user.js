const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    mail: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false, index: {unique:false, name:'my_custom_index'}}
});

const User = mongoose.model('User', UserSchema)
module.exports = User