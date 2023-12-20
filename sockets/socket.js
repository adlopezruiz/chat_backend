const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Linking Park'));
bands.addBand( new Band('ACDC'));
bands.addBand( new Band('Pendulum'));

console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje: ', payload);

        io.emit('mensaje', {admin : 'Nuevo mensaje'});
    });
    
    client.on('vote-band', (payload) => {
        console.log(payload.id);
        
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    //Escuchar evento 'add-band'
    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    //Escuchar evento 'delete-band'
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload);
        io.emit('active-bands', bands.getBands());
    });
    
});