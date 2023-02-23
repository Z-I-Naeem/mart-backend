const { check, validationResult } = require("express-validator");

exports.validateSignup = [
    check('firstName')
    .notEmpty()
    .withMessage('Must provide FirstName'),
    check('lastName')
    .notEmpty()
    .withMessage('Must provide LastName'),
    check('email')
    .isEmail()
    .withMessage('Must provide Valid Email.'),
    check('password')
    .isStrongPassword()
    .withMessage('Must provide a strong password.'),
]
exports.validateSignin = [
    
    check('email')
    .isEmail()
    .withMessage('Must provide Valid Email.')
    
]


exports.isSignupValidated = ( req, res, next) => {
    const result = validationResult(req);
    if(result.array().length > 0){
        return res.status(400).json({errors:result.array()})
    }
    next()
}
exports.isSigninValidated = ( req, res, next) => {
    const result = validationResult(req);
    if(result.array().length > 0){
        return res.status(400).json({errors:result.array()})
    }
    next()
}