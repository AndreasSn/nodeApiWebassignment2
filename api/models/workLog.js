const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var workoutScheme = require('./workoutProgram');

const workLogScheme = new Schema({
    date: {
        type: Date,
        required: true
    },
    workoutProgramId: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('workLog', workLogScheme);
