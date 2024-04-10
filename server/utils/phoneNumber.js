const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
}

module.exports = {
    validatePhoneNumber,
}