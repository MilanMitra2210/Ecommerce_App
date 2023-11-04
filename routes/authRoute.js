const express = require('express');
const {registerController} = require('./../controller/authController.js');

//router object
const router = express.Router();

//routing
//register || Method POST
router.post('/register', registerController);

module.exports = router; 