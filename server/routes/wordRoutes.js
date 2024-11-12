const express = require('express');
const router = express.Router();
const { addWord, lookUpWord} = require('../controllers/word/UsersWord')

router.post('/add',addWord);

router.get('/lookUp', lookUpWord);

module.exports = router