let Student = require("../models/student.model");

const validateEmailAccessibility = async email => {
    const result = await Student.findOne({ email: email });
    return result !== null;
};

module.exports = validateEmailAccessibility;
