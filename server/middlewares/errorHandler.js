const mongoose = require('mongoose');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        // Handle the validation error appropriately
        res.status(400).json({ error: err.message });
    } else {
        res.status(err.statusCode || 500).json({
            msg: err.message,
        });
    }
}

module.exports = errorHandlerMiddleware; 