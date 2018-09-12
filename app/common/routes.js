const fs = require('fs');

const express = require('express');
const router = express.Router();

const {ProductModel, CategoryModel} = require('./models');
const {message} = require('./messages');
const {p_storage} = require('../../settings/settings');


router.get('/', async function(req, res) {
    const products = ProductModel.find({}).select('-meta.creator -__v -ifo.category.__v -info.category.creator');
    const  w_cat = CategoryModel.find({consumer: 0}).select('-__v -creator');  // women
    const  m_cat = CategoryModel.find({consumer: 1}).select('-__v -creator');  // men
    const  k_cat = CategoryModel.find({consumer: 2}).select('-__v -creator');  // kid

    let res_cat_w = await w_cat.exec();
    let res_cat_m = await m_cat.exec();
    let res_cat_k = await k_cat.exec();
    let res_product = await products.exec();

    res.render('common/index.html', {title: "e-commerce", products: res_product, cat_w: res_cat_w, cat_m: res_cat_m, cat_k: res_cat_k});
});

router.post('/search', async function(req, res) {
    const search = req.body.search;
    const product = ProductModel.find({'info.title': search}).select('-__v -meta.creator -info.category.creator');

    let products = await product.exec();

    res.render('common/shop.html', {products: products, length: products.length})
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
