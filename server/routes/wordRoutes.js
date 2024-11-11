const express = require('express');
const router = express.Router();
const { addWord} = require('../controllers/word/UsersWord')

router.post('/add',addWord);

module.exports = router