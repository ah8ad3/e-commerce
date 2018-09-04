const {UserModel} = require('./models');

const user = (chai, server) => {
    describe('User App', () => {
        beforeEach((done) => {
            UserModel.remove({}, () => {
                done();
            });
        });
        describe('/ GET profile page', () => {
            it('should GET profile page', function (done) {
                chai.request(server)
                    .get('/auth/profile')
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
        describe('/ GET home page', () => {
            it('should GET homepage', function (done) {
                chai.request(server)
                    .get('/auth/')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
        describe('/GET register', () => {
            it('it should GET register page', (done) => {
                chai.request(server)
                    .get('/auth/register')
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        // res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
        describe('/POST register', () => {
            it('should register user', (done)=> {
                let user = {
                    email: "some@example.org",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/auth/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(201);
                        done()
                    });
            });
            it('should have 400 error on register user (email error)', (done)=> {
                let user = {
                    email: "",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/auth/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
            it('should have 400 error on register user (email and password error)', (done)=> {
                let user = {
                    email: "",
                    password: ""
                };
                chai.request(server)
                    .post('/auth/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
        });
        describe('/GET login', () => {
            it('it should GET login page', (done) => {
                chai.request(server)
                    .get('/auth/login')
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        // res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
        describe('/POST login', () => {
            it('should error on login user', (done)=> {
                let user = {
                    email: "",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/auth/login')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
            it('should error on login user', (done)=> {
                let user = {
                    email: "",
                    password: ""
                };
                chai.request(server)
                    .post('/auth/login')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
        });
        describe('User model', () => {
            it('should create user', function (done) {
                let user = new UserModel();
                user.local.email = 'ahmad';
                user.local.password = 'lbn';
                user.info.first_name = 'ahmad';
                user.save((err) => {
                    if (!err){
                        try {
                            user.validPassword(user.generateHash('lbn'));
                        }catch (e) {
                            done()
                        }
                    }
                });
            });
            it('should get list user', function (done) {
                UserModel.find({}, (err, user) => {
                    user.length.should.be.eql(0);
                    done()
                })
            });
        });

        describe('/GET 404 error', () => {
            it('it should GET local page', (done) => {
                chai.request(server)
                    .get('/auth/loginn')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });

        describe('/GET logout', () => {
            it('it should GET logout page', (done) => {
                chai.request(server)
                    .get('/auth/logout')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

    });
};

module.exports = user;