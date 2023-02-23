const express = require('express');
const { requireSignin, isUser } = require('../CommonUtilities/requireSignin');
const { addToCart } = require('../controllers/cart');
const router = express.Router();


router.post('/user/cart/addtocart', requireSignin, isUser, addToCart )



module.exports = router