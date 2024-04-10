require('dotenv').config();

var fs = require('fs');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = fs.readFileSync('./auth_rsa_pub.pem');
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findById(jwt_payload.sub);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = {
    passport,
}