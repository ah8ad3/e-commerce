const fs = require('fs');

const express = require('express');
const router = express.Router();

const {ProductModel} = require('./models');
const {message} = require('./messages');
const {p_storage} = require('../../settings/settings');


router.get('/', async function(req, res) {
    const products = ProductModel.find({}).select('-meta.creator -__v -info.category.__v -info.category.creator');
    let res_product = await products.exec();

    res.render('common/index.html', {title: "e-commerce", products: res_product});
});

router.get('/shop', function (req, res) {
    res.render('common/shop.html')
});

router.get('/contact', function (req, res) {
    res.render('common/contact.html')
});

router.get('/blog', function (req, res) {
    res.render('common/blog.html')
});

router.get('/blog/:id', function (req, res) {
    res.render('common/single-blog.html')
});

router.get('/product', function (req, res) {
    res.render('common/single-product-details.html')
});

router.get('/checkout', function (req, res) {
    res.render('common/checkout.html')
});

router.get('/regular', function (req, res) {
    res.render('common/regular-page.html')
});

router.get('/download/:file_name', function (req, res) {
    let file = `${p_storage}${req.params.file_name}`;
    if (fs.existsSync(file)) {
        res.download(file);
    }else {
        res.status(404).send(message().not_found)
    }
});

module.exports = router;
