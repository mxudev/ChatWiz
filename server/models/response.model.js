const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ResponseSchema = new mongoose.Schema(
    {
        text: {
            type: String,
        },
        parentThread: {
            type: Schema.Types.ObjectId,
            ref: "Thread",
        },
        votes: [{
            type: Schema.Types.ObjectId,
            ref: "Vote",
        }]
    }
)

module.exports = mongoose.model("Resonse", ResponseSchema);
