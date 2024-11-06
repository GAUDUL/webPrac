const bcrypt = require('bcrypt');

//비밀번호 해싱
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
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