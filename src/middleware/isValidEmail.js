// Adding body module of express validator
const { body } = require("express-validator");

// Email validator
const isEmailValid = () => {
    return [
        body("email", "Invalid email")
            .exists()
            .notEmpty()
            .isEmail()
    ];
};

module.exports = {
    isEmailValid
};
