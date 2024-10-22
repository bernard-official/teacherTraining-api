const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    jwtSecret
}