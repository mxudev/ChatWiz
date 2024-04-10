require('dotenv').config();

const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('auth_rsa_priv.pem');
var opts  = {};
opts.algorithm = 'RS256';
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;
opts.expiresIn = process.env.JWT_EXPIRES_IN || '1d';


const issueJWT = (payload) => {
    const token = jwt.sign(payload, privateKey, opts);
    return token;
}

module.exports = {
    issueJWT,
}