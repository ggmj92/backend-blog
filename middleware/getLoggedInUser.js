const jwt = require('jsonwebtoken');

/**
 * Middleware to extract user information from a JWT token in the request header.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {void}
 */
const getLoggedInUser = (req, res, next) => {
    /**
     * Logs the JWT token from the request header.
     * @type {string}
     */
    const tok = req.headers.authorization;

    if (!tok) {
        /**
         * No token found, proceed to the next middleware.
         */
        next();
    } else {
        try {
            /**
             * Decoded payload from the JWT token.
             * @type {Object}
             */
            const payload = jwt.verify(tok, process.env.JWT_SECRET);

            /**
             * User ID extracted from the JWT payload.
             * @type {string}
             */
            req._id = payload._id;

            /**
             * User name extracted from the JWT payload.
             * @type {string}
             */
            req.name = payload.name;

            /**
             * Proceed to the next middleware.
             */
            next();
        } catch (error) {
            /**
             * An error occurred while verifying the JWT token. Proceed to the next middleware.
             */
            next();
        }
    }
};

module.exports = { getLoggedInUser };
