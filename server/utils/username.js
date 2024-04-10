function generateRandomNumber10D() {
    const min = 1000000000; // Minimum 10-digit number (inclusive)
    const max = 9999999999; // Maximum 10-digit number (inclusive)
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const generateRandomUsername = () => {
    const digits = generateRandomNumber10D();
    return "user" + digits;
}

module.exports = {
    generateRandomUsername,
}