const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
    {
        phoneNumber: {
                type: String,
                unique: true,
        },
        name: {
            type: String
        },
        phoneVerification: {
            code: {
                type: String,
            },
            requestedAt: {
                type: Date,
            }
        }
    }
)

module.exports = mongoose.model("User", UserSchema);
