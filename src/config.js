require('dotenv').config();


module.exports = {
    app: {
        port: process.env.PORT,
    },

    jwt: {
        secret: process.env.JET_SECRET || 'secret note'
    },

    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'restaurante'
    }
}