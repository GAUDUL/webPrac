//wordRouter 세팅
const express = require('express');
const router = express.Router();
const { addWord, lookUpWord, deleteWord} = require('../controllers/word/UsersWord')

router.post('/add',addWord);

router.get('/lookUp', lookUpWord);

router.post('/delete', deleteWord);

module.exports = router