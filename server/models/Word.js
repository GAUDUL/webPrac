const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    spelling:{type: String, required: true},
    meaning: {type: String, required: true}
});

const WordModel = mongoose.model('Word', wordSchema);

module.exports = WordModel;
