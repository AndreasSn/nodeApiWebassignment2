const mongoose = require('mongoose')

console.log("db url", process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${process.env.MONGODB_URL}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});