const crypto = require('crypto');
const fs = require('fs');

function generateKeypair() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        },
    });

    fs.writeFileSync(__dirname + '/auth_rsa_pub.pem', keyPair.publicKey);
    fs.writeFileSync(__dirname + '/auth_rsa_priv.pem', keyPair.privateKey);
}

generateKeypair();