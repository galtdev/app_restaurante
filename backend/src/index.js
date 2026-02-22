import 'dotenv/config'; 
import app from './app.js';

const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});