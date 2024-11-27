const mongoose = require('mongoose');
//사용자 데이터 세팅
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    profileImage: {type: String, required: true}
},{ collection: 'user' });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
