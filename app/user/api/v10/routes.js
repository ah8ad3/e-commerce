const express = require('express');
const router = express.Router();

const patty = require('../../../../lib/patty');
const {register} = require('./views');


router.post('/obtain-token', patty.jwt_obtain);

router.post('/register', register);


module.exports = router;
