const { hashPassword } = require('../../components/hash');
const UserModel = require('../../models/User');

const register = async (req,res)=>{
    const { userName, userId, passWord } = req.body;
    try{
    const check = await UserModel.findOne({ userId: userId });
    if (!check) { //중복된 Id의 유저가 없는 경우
        // 비밀번호 해싱
        const hashedPassword = await hashPassword(passWord);
        //새로운 사용자 정보
        const newUser = new UserModel({
            userName,
            userId,
            passWord: hashedPassword
        });
        await newUser.save();

        req.session.user = { 
            id:userId,
            name: userName }; 

        req.session.save((err) => {
            if (err) {
                console.error('세션 저장 오류:', err);
            }
            res.status(200).json({ message: '가입 성공' });
        });
    }else { //중복
        res.statux(400).json({ message: '중복' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
}

module.exports= {register}