const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ThreadSchema = new mongoose.Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        question: {
            type: String,
        },
        responses: [{
            type: Schema.Types.ObjectId,
            ref: "Response",
        }],
        question_embedding: [{
            type: Number,
        }]
    }
)

module.exports = mongoose.model("Thread", ThreadSchema);
