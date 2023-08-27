const jwt = require('jsonwebtoken');

/**
 * Middleware to validate a JSON Web Token (JWT) from the request headers.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 * @throws {Error} If the token is missing or invalid.
 */
const validateJWT = (req, res, next) => {
    console.log('jwt', req.headers.authorization);

    const tok = req.headers.authorization;
    // const tok = req.cookies.token;

    try {
        if (!tok) {
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized'
            });
        } else {
            const payload = jwt.verify(tok, process.env.JWT_SECRET);
            req._id = payload._id;
            req.name = payload.name;
            next();
        }
    } catch (error) {
        console.log('validate jwt', error);

        // return res.status(401).json({
        //     ok: false,
        //     msg: 'Invalid token'
        // });
    }
};

module.exports = { validateJWT };
