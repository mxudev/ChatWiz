const { SendSMSVerificationCode, findUserByPhone, verifySMSCode } = require("../services/auth.service");
const { issueJWT } = require("../utils/jwt");

const SendSMSVerification = async (req, res) => {
    const { phoneNumber } = req.body;
    const user = await SendSMSVerificationCode(phoneNumber);
    res.status(200).json({
        msg: "Success! SMS verification code sent.",
    });
}

const signInUserController = async (req, res) => {
    const { phoneNumber, verificationCode } = req.body;
    const user = await findUserByPhone(phoneNumber);
    await verifySMSCode(user, verificationCode);
    const token = issueJWT({sub: user.id});
    res.status(200).json({
        msg: "Success! User signed in.",
        token: token,
    });
}

const userDetailsController = async (req, res) => {
    res.status(200).json({
        msg: "Success! User authenticated.",
        user: req.user,
    });
}


module.exports = {
    SendSMSVerification,
    signInUserController,
    userDetailsController,
}