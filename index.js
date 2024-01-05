const express = require('express');
const path = require('path');
require('dotenv').config();

//DB config
require('./database/config').dbConnection();


// App de express
const app = express();

//Lectura de información de body de peticion http
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users')); 
app.use('/api/messages', require('./routes/messages')); 

const PORT = process.env.PORT || 4569;

server.listen( PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );
});