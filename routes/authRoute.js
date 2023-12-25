const express = require('express');
const {registerController, loginController, testController} = require('./../controller/authController.js');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware.js');

//router object
const router = express.Router();

//routing
//register || Method POST
router.post('/register', registerController);

//LOGIN // POST
router.post('/login', loginController);

//test
router.get('/test', requireSignIn, isAdmin, testController );

module.exports = router; 