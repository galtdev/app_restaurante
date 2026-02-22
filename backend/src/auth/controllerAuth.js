import * as db from '../services/userService.js';
import * as dbauth from '../services/authService.js';
import * as resp from '../red/response.js';
import bcrypt from 'bcrypt';
import auth from '../auth/index.js';

async function login(req, res, next) {
    try {
        const { correo, password } = req.body;
        const usuarioLog = await dbauth.query({ correo: correo });

        if (!usuarioLog) return next(new Error("informacion invalida"));

        const comparePass = await bcrypt.compare(password, usuarioLog.password);

        if (comparePass) {
            const dataToken = auth.generateToken({
                id: usuarioLog.id,
                correo: usuarioLog.correo,
                rol: usuarioLog.rol
            });

            resp.success(req, res, { token: dataToken }, 200);
        } else {
            throw new Error("Informacion invalida");
        }

    } catch (err) {
        next(err);
    }
}

async function create(data) {
    try {
        const authData = {
            id: data.id,
            correo: data.correo,
            rol: 'admin' 
        };
        
        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return await dbauth.saveAuth(authData);   
            
    } catch (err) {
        throw err;
    }
}

export {
    create,
    login
};