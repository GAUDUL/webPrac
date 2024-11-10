const mongoose = require('mongoose');
const url = process.env.DB_URL; // MongoDB URL을 환경 변수에서 가져오기

// MongoDB에 연결하는 함수
function dbConnect() {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB 연결');
        })
        .catch((err) => {
            console.log('MongoDB 연결 실패:', err);
            throw err; // 연결 실패 시 에러를 던져서 처리
        });
}

module.exports = { dbConnect };
