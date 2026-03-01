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
import compra from './routes/compraRouter.js';

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
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));
app.use('/imagenes', express.static(path.join(__dirname, 'storage', 'img')));

// Rutas API
app.use('/api/user', users);
app.use('/api/auth', auth);
app.use('/api/menu', menu);
app.use('/api/compra', compra);

// Ruta para la Vista Principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



// Middleware de error (siempre al final)
app.use(error);

export default app;

