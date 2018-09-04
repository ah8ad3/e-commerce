const express = require('express');
const router = express.Router();

const patty = require('../../../../lib/patty');
const {product_post, category_post} = require('./views');

router.use(patty.jwt_md);
router.post('/product', product_post);
router.post('/category', category_post);


module.exports = router;
