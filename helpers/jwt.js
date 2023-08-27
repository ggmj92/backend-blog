const jwt = require('jsonwebtoken')

/**
 * Generates a JSON Web Token (JWT) for the given user information.
 *
 * @param {string} _id - The user's ID.
 * @param {string} name - The user's name.
 * @returns {Promise<string>} A Promise that resolves with the generated JWT.
 * @throws {string} Throws an error message if token generation fails.
 */
const generateJWT = (_id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { _id, name };

        // GENERATING TOKEN

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30min' },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Failed at generating token');
                }
                resolve(token)
            })
    })
}

module.exports = {
    generateJWT
}
