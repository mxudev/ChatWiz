const express = require("express");
const router = express.Router();
const { search, generateThread, generateResponse, getThread, setVote } = require("../controllers/work.controller");
const authenticateUser = require("../middlewares/authentication");

router.post("/search", authenticateUser, search);
router.post("/generateThread", authenticateUser, generateThread);
router.post("/generateResponse", authenticateUser, generateResponse);
router.get("/getThread/:id", authenticateUser, getThread);
router.post("/setVote", authenticateUser, setVote);

module.exports = router;
