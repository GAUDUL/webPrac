const bcrypt = require('bcrypt');

//해싱 과정에서 사용하는 반복 횟수
const saltRounds = 10; // 해시할 때 사용할 솔트 라운드 수

//비밀번호 해싱
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword; // 해싱된 비밀번호 반환
    } catch (error) {
        console.error('비밀번호 해싱 오류:', error);
        throw error; // 에러 발생 시 상위로 전파
    }
};


const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match; // 일치하면 true, 아니면 false
    } catch (error) {
        console.error('비밀번호 비교 오류:', error);
        throw error; // 에러 발생 시 상위로 전파
    }
};

module.exports = { hashPassword, comparePassword };