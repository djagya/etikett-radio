const { body, validationResult } = require("express-validator");

exports.validUserInputs = () => {
    return [
        body("firstName")
            .notEmpty()
            .trim()
            .escape()
            .withMessage("Invalid first name."),

        body("lastName")
            .notEmpty()
            .trim()
            .escape()
            .withMessage("Invalid last name."),

        body("userName")
            .notEmpty()
            .trim()
            .escape()
            .withMessage("Invalid user name."),

        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Invalid email address."),

        body("pw")
            .isLength({ min: 8 })
            .withMessage("Invalid password."),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = errors.errors.map(er => ({ [er.param]: er.msg }));
                console.log(errors);
                return res.json({ status: 203, message: err });
            };

            next();
        }
    ];
};