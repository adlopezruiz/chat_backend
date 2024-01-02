const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN);
        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error en BDD, a ver que has liado.')
    }
}

module.exports = {
    dbConnection
}