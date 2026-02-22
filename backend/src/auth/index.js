import jwt from 'jsonwebtoken';
import config from '../config.js';

const secret = config.jwt.secret;

// Generar el token con la data del usuario
export function generateToken(data) {
    const plainData = JSON.parse(JSON.stringify(data));
    
    return jwt.sign(plainData, secret, {
        expiresIn: '2h' 
    });
}

// Verificar que el token sea válido según nuestro secreto
export function verifyToken(token) {
    return jwt.verify(token, secret);
}

// Objeto para agrupar las verificaciones de tokens en las peticiones
export const checkToken = {
    confirmToken: function(req) {
        const decodificado = decodHead(req);
        return decodificado; // Importante retornar para que securityActions lo use
    }
};

// Extraer el token del string "Bearer <token>"
function obtenerToken(autorized) {
    if (!autorized) throw new Error("Sin token");
    if (autorized.indexOf('Bearer') === -1) throw new Error("error de formato");

    let token = autorized.replace('Bearer ', '');
    return token;
}

// Decodificar el header Authorization
function decodHead(req) {
    const autorized = req.headers.authorization || '';
    const token = obtenerToken(autorized);
    const decod = verifyToken(token);

    // Inyectamos el usuario decodificado en la request para uso posterior
    req.user = decod;

    return decod;
}

// Exportación agrupada para mantener compatibilidad con tus otros archivos
export default {
    generateToken,
    checkToken
};