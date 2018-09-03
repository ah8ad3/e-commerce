

const setting = (chai, server) => {
    describe('settings', () => {
        it('should GET fa page', function (done) {
            chai.request(server)
                .get('/fa')
                .end((err, res) => {
                    res.should.have.status(200);

                    done()
                })
        });
        it('should GET en page', function (done) {
            chai.request(server)
                .get('/en')
                .end((err, res) => {
                    res.should.have.status(200);

                    done()
                })
        });
        it('Redis connection', function (done) {
            require('./_redis');
            done()
        });
        it('Redis connection error', function (done) {
            process.env.REDIS_SES_HOST = '217';
            require('./_redis');
            done()
        });

        it('mongodb incorrect host connection', function (done) {
            process.env.DB_HOST = '5';
            require('./database');
            done()
        });

        it('socket io connection test', function (done) {
            const socket = require('socket.io-client')('localhost:5000');
            socket.on('connection', function(){});
            socket.on('welcome', function(){
            });
            socket.on('disconnect', function () {
            });
            done()
        });

    });
};

module.exports = setting;
