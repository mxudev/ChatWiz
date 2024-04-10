const { passport } = require("../utils/passport-jwt");

const authenticateUser = passport.authenticate("jwt", { session: false });

module.exports = authenticateUser;
