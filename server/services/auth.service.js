const User = require("../models/user.model");
const { generateAuthCode } = require("../utils/authCode");
const { validatePhoneNumber } = require("../utils/phoneNumber");
const { addMinutes } = require("../utils/dateTime");
const Error = require("../errors");

const SendSMSVerificationCode = async (phoneNumber) => {
    const authCode = generateAuthCode();

    //Send authcode here...
    console.log("Generated AuthCode: " + authCode);

    const user = await findOrCreateUserByPhone(phoneNumber);
    user.phoneVerification.code = authCode;
    user.phoneVerification.requestedAt = Date.now();
    await user.save();
    return user;
}

const findOrCreateUserByPhone = async (phoneNumber) => {
    if (!validatePhoneNumber(phoneNumber)) {
        throw new Error.BadRequestError("invalid phone number.");
    }
    const existingUser = await User.findOne({ "phoneNumber": phoneNumber});
    if (existingUser) {
        return existingUser;
    }
    const newUser = new User();
    newUser.phoneNumber = phoneNumber;
    await newUser.save();
    return newUser;
}

const findUserByPhone = async (phoneNumber) => {
    if (!validatePhoneNumber(phoneNumber)) {
        throw new Error.BadRequestError("invalid phone number.");
    }
    const existingUser = await User.findOne({ "phoneNumber": phoneNumber});
    if (existingUser) {
        return existingUser;
    }
}

const verifySMSCode = async (user, code) => {
    const expected = user.phoneVerification;
    const expiration = addMinutes(expected.requestedAt, 5);
    const trueCode = expected.code;
    if (expiration < Date.now()) {
        throw new Error.UnauthorizedError("Verification code expired.");
    }
    if (trueCode !== code) {
        throw new Error.UnauthorizedError("Incorrect verification code.");
    }
}

module.exports = {
    findOrCreateUserByPhone,
    SendSMSVerificationCode,
    findUserByPhone,
    verifySMSCode,

}