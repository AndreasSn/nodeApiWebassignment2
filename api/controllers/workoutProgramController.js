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
        res.status(201).json(req.body.name);
        // saved!
    });
}

module.exports.getWorkoutProgramsById = function ( req, res){
    var programIds = [];
    console.log("Body", req.body)
    req.body.forEach(program => {
        programIds.push(mongoose.Types.ObjectId( program.workoutProgramId))
        console.log("Workout program ids ",program.workoutProgramId);
    });
    console.log("Program ids ",programIds)
    
    WorkoutModel.find({_id : {$in: programIds}}, function (err, data) {
        console.log(data);
        res.status(200).json(data);
    })
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

module.exports.getAllExercises = function (req, res) {
    console.log(req.body);

    var exerciseModel;

    var workoutprogramid = req.params.id;
    var workoutProgram = WorkoutModel.findById(workoutprogramid, function (err, doc) {
        var parent = doc;
        exerciseModel = mongoose.model('exerciseModel', exerciseSchema);
        var exercise = new exerciseModel({
            exercise: req.body.exercise,
            description: req.body.description,
            set: req.body.set,
            reps_time: req.body.reps
        });

        //console.log("id: ", workoutprogramid);
        //console.log("exerciseModel: ", exerciseModel);


        workoutProgram.findOne({}, function (err, item) {
            if (err) console.log("Error getting exercises", err)
            
            //console.log("item: ", item.exercises);
            
            res.status(200).send(item.exercises);
        });

        //res.status(200).send(doc.); 
        //parent.exercises.push(exercise);

        //parent.save(function (err) {
        //    if (err) {
        //        console.log(err.message);
        //    }
        //    res.status(201).send(parent);
        //});
    });
}