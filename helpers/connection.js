const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A promise that resolves when the connection is established successfully
 *                           or rejects with an error message.
 * @throws {Error} If there is an error during the connection attempt.
 */
const dbConnect = async () => {
    try {
        const res = await mongoose.connect(process.env.URI_DB);
        console.log('Connected to DataBase');
        return {
            ok: true,
            msg: 'Connected to the database'
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Error when connecting to the database'
        };
    }
};

module.exports = { dbConnect };
