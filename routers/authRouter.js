const express = require('express')
const { check } = require('express-validator')
const { 
    getUsers, 
    createUser, 
    logIn, 
    renewToken 
} = require('../controllers/authController')
const validateAdmin = require('../middleware/validateAdmin')
const { validateExpress } = require('../middleware/validation')
const { validateJWT } = require('../middleware/validationJWT')

/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */

/**
 * Router to handle user-related routes.
 * @type {import('express').Router}
 */
const router = express.Router()

/**
 * Get a list of users.
 *
 * @function
 * @name getUsers
 * @route {GET} /users
 * @middleware validateJWT - Middleware to validate JSON Web Token.
 * @middleware validateAdmin - Middleware to validate admin privileges.
 * @handler
 */
router.get('/', validateJWT, validateAdmin, getUsers)

/**
 * Create a new user.
 *
 * @function
 * @name createUser
 * @route {POST} /users/register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @middleware validateExpress - Middleware to validate request parameters.
 * @handler
 */
router.post('/register',
    [
        check('name', 'You must fill in a name').not().isEmpty(),
        check('email', 'You must fill in an email address').isEmail(),
        check('password').notEmpty().withMessage('You must fill in your password').isLength({ min: 8 }).withMessage('Password must have at least 8 characters').matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage('Password must contain atleast one capital letter and one number'),
        validateExpress
    ],
    createUser)

/**
 * Log in a user.
 *
 * @function
 * @name logIn
 * @route {POST} /users/login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @middleware validateExpress - Middleware to validate request parameters.
 * @handler
 */
router.post('/login',
[
    check('email', 'You must fill in an email address').isEmail(),
    check('password', 'You must fill in your password').not().isEmpty(),
    validateExpress
],
logIn)

// //RENEW TOKEN
// router.get('/renew', validateJWT, renewToken)

module.exports = router