
const express = require('express')
const User = require('../models/user.js')
const auth = require("../middleware/auth")
var mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;

const addWorkLog = async function (req, res) {
    console.log(req.body);

    var userId = req.params.id;
    console.log(req.params.id)
    
    User.findById(userId, function (err, user) {
        var updatedUser = user;
        var workLogModel = mongoose.model('workLog', workLog);
        var workLog = new workLogModel({
            date: req.body.date,
            workoutProgramId: req.body.workoutProgramId,
        });
        updatedUser.workLogs.push(workLog);

        updatedUser.save(function (err) {
            if (err) {
                console.log(err.message);
            }
            res.status(201).send(updatedUser);
        });
    });
}

const createUser = async function (req, res) {
    // Create a new user
    var user = new User(req.body)
    try {
        await user.save(function (err, result) {
            if (err) console.log("ERROR ON SAVE", err);
        })
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })

    } catch (error) {
        console.log("Error in saving user", error)
        res.status(400).send(error)
    }
}

const login = async function (req, res) {
    //Login a registered user
    try {
        const { emailAddress, password } = req.body

        const user = await User.findByCredentials(emailAddress, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const getUser = async function (req, res) {
    console.log("Payload; ", req.payload)
    res.status(200).send(req.payload);
}

const getUsers = async function (req, res) {
    User.find({}, function(err, users) {
        if(err) console.log("INGEN USERS")
        console.log(users);
        res.status(200).send(users)
    })
}
module.exports = {
    login,
    createUser,
    getUser,
    getUsers,
    addWorkLog
}