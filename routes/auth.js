const express = require('express');
const ctrl = require('../controllers/auth');
const {validateBody, authenticate, upload}  = require("../middlewares");
const {schemas} = require("../db/models/user");

const router = express.Router();

//--------------------------------------------------------------------------------------------------------------------------------------

// SIGN UP
router.post('/signup', validateBody(schemas.signUpSchema), ctrl.signup);            // запит на реєстрацію нового користувача
router.get('/verify/:verificationToken', ctrl.verifyEmail);                         // запит на верифікацію єлектронної пошти юзера   
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);  // запит на повторну верифікацію єлектронної пошти юзера

// SIGN IN
router.post('/signin', validateBody(schemas.signInSchema), ctrl.signin);            // запит на авторизацію існуючого користувача
router.post('/signout',authenticate, ctrl.signout);                                 // запит на розавторизацію існуючого користувача

//--------------------------------------------------------------------------------------------------------------------------------------
    
module.exports = router;
