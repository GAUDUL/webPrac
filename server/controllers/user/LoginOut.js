const { comparePassword } = require('../../components/hash');
const UserModel = require('../../models/User');

const checkLoginStatus = async (req,res)=>{
    console.log('세션 상태:', req.session); // 세션 상태 로그
    if (req.session.user) {
        res.json({ 
            isLoggedIn: true,
            userName: req.session.user.name
        });
    } else {
        res.json({ isLoggedIn: false });
    }
}

const login = async(req,res)=>{
    const { userId, passWord } = req.body;

    const userMatch= await UserModel.findOne({userId:userId})
    if (userMatch) { //해당 id 사용자를 찾았을 경우
        //비밀번호가 일치하는지 확인
        const isMatch =await comparePassword(passWord, userMatch.passWord);
        if (isMatch) {
            req.session.user = {
                id: userId,
                name: userMatch.userName,
                authorized: true,
            };
            req.session.save((err) => {
                if (err) {
                    console.error('세션 저장 오류:', err);
                }
                res.status(200).json({ message: '로그인 성공' });
            });
        } else {
            res.status(401).json({message: '비밀번호가 일치하지 않습니다' });
        }
    } else {
        res.status(404).json({message: '사용자를 찾을 수 없습니다' });
    }
}

const logout = async (req,res)=>{
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error('세션 삭제 오류:', err);
                return res.status(500).json({ message: '로그아웃 실패' });
            }
            res.status(200).json({ message: '로그아웃 성공' });
        });
    } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
    }
}


module.exports = {login, logout, checkLoginStatus };