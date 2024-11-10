const UserModel = require('../../models/User');


const profileUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: '파일이 업로드되지 않았습니다.' });
    }
    // 파일 경로 생성
    const filePath = `/uploads/profile/${req.file.filename}`;

    // DB에 파일 경로 저장
    const userId = req.session.user.id;
    UserModel.updateOne({ userId: userId }, { profileImage: filePath })
    .then(() => {
        res.json({ success: true, profileImageUrl: filePath });
    })
    .catch(err => {
        console.error('DB 저장 실패:', err);
        res.status(500).json({ success: false, message: 'DB 저장 중 오류 발생' });
    });
};

module.exports = { profileUpload };
