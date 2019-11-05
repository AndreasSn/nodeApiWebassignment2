var mongoose = require('mongoose');
var WorkoutModel = require('../models/workoutProgram');
var exerciseSchema = require('../models/exercise');

module.exports.getAllWorkoutPrograms = function (req, res) {
    var error = req.query.err;
    WorkoutModel.find({}, function (err, items) {
        if (err) console.log("øv bøv", err)
        
        res.status(200).send(items);
    });
};

module.exports.createWorkoutProgram = function (req, res) {
    console.log("DEN HER BODY !!", req.body);

    // Create an instance of model MyModel
    var newWorkoutProgram = new WorkoutModel({
        name: req.body.name
    });

    // Save the new model instance, passing a callback
    newWorkoutProgram.save(function (err) {
        if (err) {
            res.status(400).send('ÅÅh nej, kunne ikke lave workoutprogram');
            return console.log(err.message);
        }

        console.log("A workout program with name: " + req.body.name + " was succesfully created!");
        res.status(201).send(req.body.name);
        // saved!
    });
}


module.exports.getWorkoutProgram = function (req, res) {
    var workoutprogramid = req.params.id;
    WorkoutModel.findById(workoutprogramid, function (err, doc) {
        if (!doc) {
            res.status(400).send('no workout program with that id')
        }
        console.log("Fandt et program", doc)
        res.status(200).send(doc);
    });
}

module.exports.addExercise = function (req, res) {
    console.log(req.body);

    var workoutprogramid = req.params.id;
    WorkoutModel.findById(workoutprogramid, function (err, doc) {
        var parent = doc;
        var exerciseModel = mongoose.model('exerciseModel', exerciseSchema);
        var exercise = new exerciseModel({
            exercise: req.body.exercise,
            description: req.body.description,
            set: req.body.set,
            reps_time: req.body.reps
        });
        parent.exercises.push(exercise);

        parent.save(function (err) {
            if (err) {
                console.log(err.message);
            }
            res.status(201).send(parent);
        });
    });
}