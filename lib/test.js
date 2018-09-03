const log = require('./log');

const lib = (chai, server) => {
    describe('Libs', () => {
        const middle = require('./locale_middleware');
        let req = {cookies: {locale: undefined}, body: {locale: undefined}};
        it('log test', function (done) {
            log.info('test');
            log.danger('test');
            log.regular('test');
            done()
        });

        it('locale_middleware cookies', function (done) {
            req.cookies.locale = 'fa';
            middle(req, undefined, () => {});
            done()
        });

        it('locale_middleware locale body', function (done) {
            req.body.locale = 'fa';
            middle(req, undefined, () => {});
            done()
        });
    });
};

module.exports = lib;