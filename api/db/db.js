const mongoose = require('mongoose')

console.log("db url", "mongodb://heroku_kv70jnvj:g707bj1hhhctvam4faa80at0b6@ds239858.mlab.com:39858/heroku_kv70jnvj")

mongoose.connect('mongodb://heroku_kv70jnvj:g707bj1hhhctvam4faa80at0b6@ds239858.mlab.com:39858/heroku_kv70jnvj', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to mongodb://heroku_kv70jnvj:g707bj1hhhctvam4faa80at0b6@ds239858.mlab.com:39858/heroku_kv70jnvj`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});