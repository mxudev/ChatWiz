const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}

const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);

    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday hasn't occurred yet in the current year
    if (
        currentDate.getMonth() < birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() &&
            currentDate.getDate() < birthDateObj.getDate())
    ) {
        age--;
    }
    return age;
}

module.exports = {
    addMinutes,
    calculateAge
}