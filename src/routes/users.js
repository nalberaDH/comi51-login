const express = require('express');
const userControlers = require('../controllers/userControllers');
const { body } = require('express-validator');

const router = express.Router();

const validateLogin = [
    body('email').isEmail().withMessage('Invalid mail'),
    body('password').notEmpty().withMessage('Enter a password')
];

const validateRegister = [
    body('email').isEmail().withMessage('Invalid mail'),
    body('password').notEmpty().withMessage('Enter a password'),
    body('name').notEmpty().withMessage('Enter a name'),
    body('surname').notEmpty().withMessage('Enter a surname')
];

router.get('/login',userControlers.login);
router.get('/register',userControlers.register);

router.post('/login',validateLogin,userControlers.postLogin);
router.post('/register',validateRegister,userControlers.postRegister);

module.exports = router;