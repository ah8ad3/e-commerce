const common = (chai, server) => {
    describe('Common App', () => {
        it('should GET common index', function (done) {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                })
        });
        it('should GET download file', function (done) {
            chai.request(server)
                .get('/download/chrome.png')
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                })
        });
        it('should GET 404 on download file', function (done) {
            chai.request(server)
                .get('/download/file.pdf')
                .end((err, res) => {
                    res.should.have.status(404);
                    done()
                })
        });
    });
};

module.exports = common;