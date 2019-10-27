const User = require('../models/user.js')
var jwt = require('express-jwt');

// const auth = async(req, res, next) => {

//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const data = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User.findOne({ _id: data._id})
//         console.log("Data",data);
//         console.log("USER ",user);
//         if (!user) {
//             throw new Error()
//         }
//         req.user = user
//         req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({ error: 'Not authorized to access this resource' })
//     }

// }
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
module.exports = auth