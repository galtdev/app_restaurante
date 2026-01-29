const express = require('express');
const path = require('path');
const config = require('./config');
const morgan = require('morgan');
const error = require('./red/errors')

const app = express();

const clientes = require('./routes/clienteRutas');
const users = require('./routes/userRutas');
const auth = require('./routes/authRouter');


// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Configuracion y archivos estaticos
app.set('port', config.app.port);
app.use(express.static(path.join(__dirname, '..', 'public')));


// rutas API (auth)
app.use('/api/user', users);
app.use('/api/auth', auth);


// Ruta para la Vista (Relativa al servidor)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


app.use(error);

module.exports = app;