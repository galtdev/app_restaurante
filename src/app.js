import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Necesario para emular __dirname
import morgan from 'morgan';

import config from './config.js';
import error from './red/errors.js';

// Importación de rutas (Asegúrate de que tengan .js)
import users from './routes/userRutas.js';
import auth from './routes/authRouter.js';
import menu from './routes/menuRouter.js';

// --- Configuración de __dirname para ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --------------------------------------------------

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración y archivos estáticos
app.set('port', config.app.port);
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas API
app.use('/api/user', users);
app.use('/api/auth', auth);
app.use('/api/menu', menu);

// Ruta para la Vista
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// Middleware de error (siempre al final)
app.use(error);

export default app;

