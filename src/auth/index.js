
// CONFIG DE JWT

const jwt = require('jsonwebtoken');
config = require('../config');

const secret = config.jwt.secret;

function generateToken(data){
    return jwt.sign(data, secret);
}

function verifyToken(token){
    return jwt.verify(token, secret);
}

const checkToken = {
    confirmToken: function(req){
        const decodificado = decodHead(req);
    }
}


function obtenerToken(autorized){
    if(!autorized) throw new Error("Sin token");
    if(autorized.indexOf('Bearer') === -1) throw new Error("error de formato")

    let token = autorized.replace('Bearer ', '');
    return token;
}

function decodHead(req){
    const autorized = req.headers.authorization || '';
    const token = obtenerToken(autorized);
    const decod = verifyToken(token);

    req.user = decod;

    return decod;
}



module.exports = {
    generateToken,
    checkToken
}