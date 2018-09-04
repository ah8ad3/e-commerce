const validator = require('validator');

const {passport} = require('../../../../settings/settings');
const {message} = require('../../messages');


const register = function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    if (validator.isEmail(email) || validator.isEmpty(pass) === false) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                res.status(500).send({error: message().server_error})
            }
            else if (user === false) {
                res.status(400).send({error: message().email_taken});
            }else {
                res.status(201).send(message().register_suc);
            }
        })(req, res, next);
    }else {
        res.status(400).send({error: message().input_format})
    }
};


module.exports = {
    register: register
};
