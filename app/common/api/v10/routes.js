const express = require('express');
const router = express.Router();

const patty = require('../../../../lib/patty');
const {product_post} = require('./views');

router.use(patty.jwt_md);
router.post('/product', product_post);


module.exports = router;
