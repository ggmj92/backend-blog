const { validationResult } = require('express-validator');

/**
 * Middleware to validate the results of Express request validation.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {void}
 */
const validateExpress = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        console.log('validate', error);
        res.status(400).json({
            ok: false,
            error
        });
    } else {
        console.log('validate, no error');
        next();
    }
};

module.exports = {
    validateExpress
};
