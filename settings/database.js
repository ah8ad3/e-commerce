const mongoose = require('mongoose');
const patty = require('../lib/patty');

const {internal} = require('./messages');


const options = {useNewUrlParser: true };
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    options).then(() => {
    patty.log.info(internal.database_connected);
}).catch(() => {
    patty.log.danger(internal.database_error);
    process.exit()
});


module.exports = mongoose;
