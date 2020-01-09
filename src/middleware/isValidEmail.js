// Adding body module of express validator
const { check } = require("express-validator");

// Email validator
const isEmailValid = () => {
    return [
        check("email", "Invalid email")
            .exists()
            .notEmpty()
            .isEmail()
    ];
};

module.exports = {
    isEmailValid
};
