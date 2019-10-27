const bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var UserModel = require('../models/user');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'inputEmail',
    passwordField: 'inputPassword'
},
    function (email, password, done) {
        User.findOne({ emailAddress: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }

            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    console.log('Correct password!');

                    return done(null, user);
                }
                else {
                    console.log('Login error: Incorrect password');

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
            })
        });
    })
);

passport.serializeUser((user, cb) => {
    console.log("Ser: " + user);
    cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    console.log('deserializeUser', id);

    console.log("Des1" + id);
    User.findById(id, function (err, user) {
        console.log("Des2" + user);
        if (err) { return cb(err); }
        cb(null, user);
    });
});

module.exports = passport;