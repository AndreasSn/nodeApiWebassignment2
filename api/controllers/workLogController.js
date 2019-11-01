var mongoose = require('mongoose');
var workLogModel = require('../models/workLog');
var workoutProgramScheme = require('../models/workoutProgram');


module.exports.createWorkLog = function (req, res) {
    console.log(req.body);

    // Create an instance of model MyModel
    var newWorkLog = new workLogModel({
        date: req.body.date,
        workoutProgramId: req.body.workoutProgramId
    });

    // Save the new model instance, passing a callback
    newWorkLog.save(function (err) {
        if (err) {
            res.status(400).send('ÅÅh nej, kunne ikke lave workLog');
            return console.log(err.message);
        }

        console.log("A work log id: " + req.body.workoutProgramId + " was succesfully created!");
        res.status(201).send(req.body.name);
        // saved!
    });
}