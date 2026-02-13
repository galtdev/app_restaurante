
const auth = require('../auth/index');
const resp = require('../red/response');

const isLogged = () =>{
    return (req, res, next)=>{
        try{
            auth.checkToken.confirmToken(req);
            next();
        }
        catch (err) {resp.error(req, res, 'Debes iniciar sesion para realizar esta accion', 401);}

    }
}

const checkRol = (rolRequired) => {
    return (req, res, next) => {
        try {
            const user = auth.checkToken.confirmToken(req);
            if (user.rol !== rolRequired) return resp.success(req, res, 'no tienes permisos', 403);
            next();
        }catch (err){
            resp.error(req, res, 'token invalido o expirado', 401)
        }
    }
}

module.exports = {
    isLogged,
    checkRol
}


