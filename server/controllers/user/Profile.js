const UserModel = require('../../models/User');


const profileUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: '파일이 업로드되지 않았습니다.' });
    }
    // 파일 경로 생성
    const filePath = `${req.protocol}://${req.get('host')}/uploads/profile/${req.file.filename}`;

    // DB에 파일 경로 저장
    const userId = req.session.user.id;
    UserModel.updateOne({ userId: userId }, { profileImage: filePath })
    .then(() => {
        console.log('URL 저장 성공')
        res.json({ success: true, profileImageUrl: filePath });
    })
    .catch(err => {
        console.error('DB 저장 실패:', err);
        res.status(500).json({ success: false, message: 'DB 저장 중 오류 발생' });
    });
};

const profileUpdate = async (req,res)=>{
    const userId =req.session.user.id;
    const userMatch= await UserModel.findOne({userId: userId})
    if(userMatch){
        const profileImg=userMatch.profileImage
        res.json({
            userName: req.session.user.name,
            profileImage: profileImg })
    }
    else{
        console.log('프로필 업데이트 실패')
    }
}

module.exports = { profileUpload, profileUpdate };
