const mongoose = require("../utilities/dbConnect");
require("mongoose-type-email");
const { toDate } = require("validator");

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
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: String,
        required: true,
        validate: {
            validator: string => toDate(string),
            message: "DoB invalid"
        }
    },
    projects: [{
        type: mongoose.Types.ObjectId,
        ref: "project"
    }]
};

const collectionName = "student";
const studentSchema = mongoose.Schema(schema);
const Student = mongoose.model(collectionName, studentSchema);

module.exports = Student;
