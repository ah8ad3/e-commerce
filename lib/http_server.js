const http = require('http');
const log = require('./log');


const http_server = (app) => {
    const server = http.createServer(app);

    let io = undefined;
    if (process.env.SOCKET_USE === '1'){
        io = require('socket.io')(server);
        log.info('using socket io')
    }

    return {
        io: io,
        server: server
    }
};

module.exports = http_server;
