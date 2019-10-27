const mongoose = require('mongoose');
var exerciseSchema = require('./exercise');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema]
});

module.exports = mongoose.model('WorkoutProgram', workoutSchema);