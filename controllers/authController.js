const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const JWT = require('jsonwebtoken')


/**
 * Get all users from the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves once the response is sent.
 */
const getUsers = async (req, res) => {
    try {

        const users = await User.find()

        return res.status(200).json({
            ok: true,
            data: users,
            msg: 'All users',
        });
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Server error : Something went wrong'
        })
        
    }
}

/**
 * Create a new user in the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves once the response is sent.
 */
const createUser = async (req, res) => {
    console.log('createUser', req.body)
    const { name, email, password, isAdmin } = req.body;

    try {

        //checking if user exists
        let userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                ok: false,
                msg: 'This user already exists'
            });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed, isAdmin })
        console.log('newUser:', newUser)

        const token = JWT.sign({ _id: newUser._id, name: newUser.name }, process.env.JWT_SECRET)

        res.cookie('token', token)

        return res.status(201).json({
            ok: true,
            data: newUser,
            msg: 'New user created',
            token
        });


    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Server error : Something went wrong'
        })

    }
}

/**
 * Log in a user.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves once the response is sent.
 */
const logIn = async (req, res) => {
    console.log('logIn', req.body)
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist'
            })
        }

        const passOk = await bcrypt.compare(password, user.password)

        if (!passOk) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect Password'
            })
        }
        
        const token = JWT.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(200).json({
            ok: true, 
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Server error : Something went wrong'
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    logIn
}