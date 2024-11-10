const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const {login, logout, checkLoginStatus } = require('../controllers/user/LoginOut');
const {register} = require('../controllers/user/Register')
const { profileUpload } = require('../controllers/user/Profile')

// multer 설정 (업로드할 디렉토리 지정)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/profile/';
        // 업로드 디렉토리 확인 후 없으면 생성
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const userId = req.session.user.id;
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        const filename = `${userId}_${timestamp}${fileExtension}`;
        cb(null, filename);
    }
});
  
const upload = multer({ storage: storage });


router.get('/',checkLoginStatus)

router.post('/register', register);

router.post('/login', login)

router.get('/logout',logout);

router.post('/uploadProfileImage', upload.single('profileImage'), profileUpload);


module.exports = router