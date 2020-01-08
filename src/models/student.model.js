const mongoose = require("../utilities/dbConnect");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

const schema = {
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    }
};

const collectionName = "student";
const studentSchema = mongoose.Schema(schema);
const Student = mongoose.model(collectionName, studentSchema);

module.exports = Student;
