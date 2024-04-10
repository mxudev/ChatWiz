const express = require("express");
const router = express.Router();
const { SendSMSVerification, signInUserController, userDetailsController } = require("../controllers/auth.controller");
const authenticateUser = require("../middlewares/authentication");

router.post("/send-SMS-verification", SendSMSVerification);
router.post("/signin", signInUserController);
router.get("/user", authenticateUser, userDetailsController);

module.exports = router;