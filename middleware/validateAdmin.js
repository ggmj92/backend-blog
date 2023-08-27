const User = require("../models/userModel");

/**
 * Middleware to validate if the user is an admin.
 * If the user is not an admin, it sends a 401 response.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {import('express').Error}
 */
const validateAdmin = async (req, res, next) => {
    try {
        /** @type {User} */
        const admin = await User.findById(req._id);

        if (!admin.isAdmin) {
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Not authorized'
        });
    }
};

module.exports = validateAdmin;
