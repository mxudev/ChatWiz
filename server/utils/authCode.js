const generateAuthCode = () => {
    const authCode = Math.floor(100000 + Math.random() * 900000);
    return authCode.toString();
}

module.exports = {
    generateAuthCode
}