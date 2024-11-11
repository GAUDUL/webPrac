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
const {dbConnect}= require('./components/DbConnect');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 URL
    credentials: true // 쿠키와 같은 자격 증명 허용
}));
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true, // 클라이언트에서 JavaScript로 접근할 수 없게 설정
        maxAge: 1000 * 60 * 60 * 24,
    }
}));


const userRouter = require('./routes/userRoutes')
const wordRouter= require('./routes/wordRoutes')

router.get('/', (req, res) => {
    res.json({message:'Hello NodeJs'})
});

app.use('/', router);
app.use('/user', userRouter);
app.use('/word', wordRouter);


app.listen(port, () => {
    console.log("listen") // 정상 작동
    dbConnect(); //DB 연결
}); 

