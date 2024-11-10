const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    profileImage: {type: String, required: true}
},{ collection: 'user' });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
