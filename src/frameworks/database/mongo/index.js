const mongoose = require('mongoose');
const schemas = require('./schemas')
module.exports = {
    connect: () => {
        const cluster = process.env.cluster;
        mongoose.connect(cluster);

         const db = mongoose.connection;
         db.on('error', console.error.bind(console, 'Connection failed'));
         db.once('open', () => {
            console.log('successfully connected to database');
         });
    },
    schemas
}