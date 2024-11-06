const express = require('express');
const router = express.Router();
const {hashPassword, comparePassword} = require('../components/hash');
const {getDatabase} = require('../DB/DbConnect');

router.get('/', (req, res) => {
    console.log('세션 상태:', req.session); // 세션 상태 로그
    if (req.session.user) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

router.post('/register', async (req, res) => {
    const db = getDatabase();
    const user=db.collection("user");
    const { userName, userId, passWord } = req.body;
    try{
    const check = await user.findOne({ userId: userId });
    if (!check) { //중복된 Id의 유저가 없는 경우
        // 비밀번호 해싱
        const hashedPassword = await hashPassword(passWord);
        //user컬렉션에 넣기
        user.insertOne({
            'userName':userName,
            'userId': userId,
            'passWord': hashedPassword
        })
        req.session.user = { userId, userName };
        console.log('세션 설정:', req.session); // 세션 로그 확인
        res.status(200).json({ message: '가입 성공' });
    }else { //중복
        res.json({ message: '중복' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
});

router.post('/login', async (req, res) => {
    const db = getDatabase();
    const user=db.collection("user");
    const { userId, passWord } = req.body;

    const userMatch= await user.findOne({userId:userId})
    if (userMatch) { //해당 id 사용자를 찾았을 경우
        //비밀번호가 일치하는지 확인
        const isMatch =await comparePassword(passWord, userMatch.passWord);
        if (isMatch) {
            req.session.user = {
                id: userId,
                authorized: true,
            };
            console.log('세션 설정:', req.session); // 세션 로그 확인
            req.session.save((err) => {
                if (err) {
                    console.error('세션 저장 오류:', err);
                }
                res.status(200).json({ message: '가입 성공' });
            });
        } else {
            res.status(401).json({message: '비밀번호가 일치하지 않습니다.' });
        }
    } else {
        res.status(404).json({message: '사용자를 찾을 수 없습니다.' });
    }
})

module.exports = router