
// CONFIG DE JWT

const jwt = require('jsonwebtoken');
config = require('../config');

const secret = config.jwt.secret;

function generateToken(data){
    return jwt.sign(data, secret);
}

module.exports = {
    generateToken
}