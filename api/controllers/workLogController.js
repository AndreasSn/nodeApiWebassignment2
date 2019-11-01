var mongoose = require('mongoose');
var workLogModel = require('../models/workLog');


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

module.exports.getWorkLog = function (req, res) {
    workLogModel.find({}, function (err, workLog) {
        if (!workLog) {
            res.status(400).send('no workout program with that id')
        }
        console.log("Fandt et program", workLog)
        res.status(200).send(workLog);
    });
}
