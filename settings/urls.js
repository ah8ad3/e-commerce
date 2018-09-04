const path = require('path');

const commonRouter = require('../app/common/routes');
const userRouter = require('../app/user/routes');

const patty = require('../lib/patty');

function urls(app, io, express){
    app.use('/', commonRouter);
    app.use('/auth', userRouter);

    app.use('/fa', function (req, res) {
        res.cookie('locale', 'fa');
        res.redirect('/');
    });
    app.use('/en', function (req, res) {
        res.cookie('locale', 'en');
        res.redirect('/');
    });

    if (process.env.PD_FLAG === 'dev' || process.env.PD_FLAG === 'test') {
        // should use nginx or apache instead
        app.use('/static', express.static(path.join(__dirname, '../assets/statics')));

        // should use nginx or apache instead
        app.use('/media', express.static(path.join(__dirname, '../assets/media/public')));

    }

    // socket come here, you can add more things by adding this section in you're apps or anywhere and make it easy
    // this is super easy template
    if (process.env.SOCKET_USE === '1' && io !== undefined)  {
        io.on('connection', (socket) => {
            let address = socket.handshake.address;
            let id = socket.id;
            patty.log.regular(`New connection from ${address} and id ${id}`);
            socket.emit('welcome', 'Welcome user, this sent from server');

            socket.on('disconnect', () => {
                patty.log.regular(`Connection from ${address}  and id ${id} closed`);
            });
            socket.close()
        })
    }

    // catch 404 and forward to error handler
    app.use(function(req, res) {
        res.status(404);
        res.send('Not Found');
    });

    // error handler
    app.use(function(err, req, res) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = urls;
