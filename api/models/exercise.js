const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define a schema
const exerciseSchema = new Schema({
    exercise: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    set: {
        type: Number,
        required: true
    },
    reps_time: {
        type: String,
        required: true
    }
});

module.exports = exerciseSchema;