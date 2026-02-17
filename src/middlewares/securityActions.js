import auth from '../auth/index.js';
import { error, success } from '../red/response.js';

const isLogged = () => {
    return (req, res, next) => {
        try {
            auth.checkToken.confirmToken(req);
            next();
        } catch (err) {
            error(req, res, 'Debes iniciar sesion para realizar esta accion', 401);
        }
    }
}

const checkRol = (rolRequired) => {
    return (req, res, next) => {
        try {
            const user = auth.checkToken.confirmToken(req);
            if (user.rol !== rolRequired) {
                return success(req, res, 'no tienes permisos', 403);
            }
            next();
        } catch (err) {
            error(req, res, 'token invalido o expirado', 401);
        }
    }
}

export default {
    isLogged,
    checkRol
};

