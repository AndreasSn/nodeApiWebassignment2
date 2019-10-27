const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

//Define a schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
    }
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user

    let expiry = new Date();
    //  expiry.setMinutes(expiry.getMinutes() + 2)
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        emailAddress: this.emailAddress,
        firstName: this.firstName,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.

    const user = await User.findOne({ emailAddress: email })
    console.log("User: ", user);
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    try {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        return user

    } catch (error) {
        console.log("pis og lort ", error)
    }

}

const User = mongoose.model('User', userSchema)

module.exports = User;