const express = require('express');
const { connect } = require('http2');
const path = require('path');
require('dotenv').config();

// App de express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

const PORT = process.env.PORT || 4569;

server.listen( PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );
});