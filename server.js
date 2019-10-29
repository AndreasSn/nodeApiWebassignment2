require('dotenv').config();
require('./api/db/db');
require('./api/models/user');
var bodyParser = require('body-parser');
var express = require("express"),
    app = express(),
    port = process.env.PORT;
var cors = require('cors')


// routes
var userRouter = require('./api/routes/users');
var workoutProgramRouter = require('./api/routes/workoutProgram');
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/workoutPrograms', workoutProgramRouter);

// catch for unauthorized people. (bad token)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

