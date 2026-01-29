exports.success = function (req, res, msj = '', status = 200){
    res.status(status).json({
        error: false,
        status: status,
        body: msj
    });
}

exports.error = function (req, res, msj = 'Error interno', status = 500) {
    res.status(status).json({
        error: true,
        status: status,
        body: msj
    });

}