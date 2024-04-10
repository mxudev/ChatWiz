const mongoose = require('mongoose');

const connectDB = (url) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return mongoose.connect(url, options);
};

module.exports = connectDB;