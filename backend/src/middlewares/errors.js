function error (mensaje, code){
    let e = new Error(mensaje);

    if(code){
        e.statusCode = code;
    }

    return e;
}


export default error;