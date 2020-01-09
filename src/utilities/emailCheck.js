const mongoose = require("../utilities/dbConnect");
let Student = require("../models/student.model");
require("mongoose-type-email");

const isEmailAvailable = async email => {
    const result = await Student.findOne({ email: mongoose.Types.Email(email) });
    return result !== null;
};

module.exports = isEmailAvailable;
