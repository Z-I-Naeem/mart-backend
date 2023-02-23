const express = require('express');
const { requireSignin } = require('../CommonUtilities/requireSignin');
const router = express.Router()
const { signup, signin } = require('../controllers/auth');
const { validateSignup, isSignupValidated, validateSignin, isSigninValidated } = require('../Validators/authValidators');



router.post('/signup',validateSignup, isSignupValidated, signup)

router.post('/signin',validateSignin, isSigninValidated, signin)

router.post('/profile', requireSignin, (req,res) => {
    res.status(200).json({user:'profile'})
})


module.exports = router




// require express
// define express router
//  define the methods ( get post etc.)
//  must define module.exports router