const express = require('express');
const router = express.Router();

const patty = require('../../../../lib/patty');
const {
    product_post,
    product_get,
    category_post,
    category_get,
    category_delete,
    product_delete,
    blog_post,
    blog_get,
    blog_delete
} = require('./views');

router.use(patty.jwt_md);

router.post('/product', product_post);
router.get('/product', product_get);
router.delete('/product', product_delete);

router.post('/category', category_post);
router.get('/category', category_get);
router.delete('/category', category_delete);

router.post('/blog', blog_post);
router.get('/blog', blog_get);
router.delete('/blog', blog_delete);

module.exports = router;
