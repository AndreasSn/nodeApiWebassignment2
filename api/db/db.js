const mongoose = require('mongoose')
require('dotenv');
console.log("db url", `${process.env.MONGOLAB_URI}`);

mongoose.connect(process.env.MONGOLAB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log(`${process.env.MONGOLAB_URI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});