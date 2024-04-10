const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const VoteSchema = new mongoose.Schema(
    {
        isUp: {
            type: Boolean,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        parentResponse: {
            type: Schema.Types.ObjectId,
            ref: "Response",
        },
    }
)

module.exports = mongoose.model("Vote", VoteSchema);
