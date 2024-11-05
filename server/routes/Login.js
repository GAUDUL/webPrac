const express = require('express');
const router = express.Router();
const {hashPassword, comparePassword} = require('../components/hash');

const users = [
    { userId: 'hi', password: 'hashedPassword1' },
    { userId: 'hello', password: 'hashedPassword2' },
];

router.post('/register', async (req, res) => {
    const { userId, passWord } = req.body;
    
    // 비밀번호 해싱
    const hashedPassword = await hashPassword(passWord);

    // 사용자 데이터 저장
    users.push({ userId, password: hashedPassword });
    res.json({ message: '가입 성공' });
});

router.post('/login', async (req, res) => {
    const { userId, passWord } = req.body;
    const user = users.find(u => u.userId === userId);
    console.log(userId);
    if (user) {
        //const isMatch = await comparePassword(passWord, user.password);
        const isMatch=true;
        if (isMatch) {
            req.session.user = {
                id: userId,
                authorized: true,
            };
            res.json({message: "로그인 성공"});
        } else {
            res.status(401).json({message: '비밀번호가 일치하지 않습니다.' });
        }
    } else {
        res.status(404).json({message: '사용자를 찾을 수 없습니다.' });
    }
})

module.exports = router