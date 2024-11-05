const express = require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session')
const router = express.Router();
require('dotenv').config(); //환경 변수
const port = process.env.PORT;

const userRouter = require('./routes/Login')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 URL
    credentials: true // 쿠키와 같은 자격 증명 허용
}));
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 30 * 60 * 1000, httpOnly:true, secure:false },
    resave:false,
    saveUninitialized:false
}))

router.get('/', (req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

app.use('/', router);
app.use('/user', userRouter);



app.listen(port, () => {
    console.log("listen") // 정상 작동
    //dbConnect(); //DB 연결
}); 

