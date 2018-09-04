const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


const api_jwt = function(req, res, next) {

    // check header or url parameters or post parameters for token
    const token = req.body.token || req.params.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate with jwt' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'Token missed'
        });
    }
};


module.exports = api_jwt;
