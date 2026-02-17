export const success = function (req, res, msj = '', status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: msj
    });
}

export const error = function (req, res, msj = '', status = 500) {
    res.status(status).send({
        error: true,
        status: status,
        body: msj
    });
}

// Creamos un objeto que agrupe ambas funciones
const respuesta = {
    success,
    error
};

// Exportación por defecto para que funcione el: import respuesta from './response.js'
export default respuesta;