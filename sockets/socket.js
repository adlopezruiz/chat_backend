const { checkJWT } = require('../helpers/jwt');
const {io} = require('../index');
const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valid, uid ] = checkJWT(client.handshake.headers['x-token']);

    if (!valid) {
        return client.disconnect();
    }

    connectedUser(uid);

    // Ingresar user a una sala de chat, hay 2 salas, broadcast general y privada
    client.join( uid );

    //Listen to personal messages
    client.on('personal-message', async( payload ) => {
        await saveMessage(payload);

        
        io.to(payload.to).emit('personal-message', payload);
    });


    client.on('disconnect', () => {
        disconnectedUser(uid);
        console.log('Cliente desconectado');
    });

});