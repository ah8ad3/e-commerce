/*
We here define all obtain key strategy

author: ah8ad3

input: req.body.email && req.body.password

output:
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
*/


const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const {UserModel} = require('../app/user/models');


const obtain_token = function(req, res) {

    // find the user
    if (req.body.email && req.body.password){
        UserModel.findOne({
            'local.email': req.body.email
        }, function(err, user) {

            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'username or password wrong' });
            } else if (user) {

                // check if password matches
                if (!user.validPassword(req.body.password)) {
                    res.json({ success: false, message: 'username or password wrong' });
                } else {
                    // if user is found and password is right
                    // create a token
                    const payload = {
                        email: user.local.email,
                        sign_at: new Date().getTime()
                    };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.json({
                        success: true,
                        message: 'Token created',
                        token: token
                    });
                }

            }

        });
    }else{
        res.json({
            success: false,
            message: 'Email and Password missed'
        })
    }

};

module.exports = obtain_token;

