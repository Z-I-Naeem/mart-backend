const express = require('express');
const { requireSignin, isAdmin } = require('../CommonUtilities/requireSignin');
const { products } = require('../controllers/product');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate()+ '-' + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })





router.post('/product/create', requireSignin, isAdmin, upload.array('productPicture'), products )



module.exports = router