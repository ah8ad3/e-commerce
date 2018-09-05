const fs = require('fs');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const patty = require('../../../../lib/patty');

const {ProductModel, CategoryModel} = require('../../models');
const {api_message} = require('../../messages');

const product_post = async function (req, res, next) {
    let body = req.body;
    let params = {
        title: body.title,
        price: body.price,
        description: body.description,
        sizes: body.sizes,
        colours: body.colours,
        stock: body.stock,
        is_discount: body.is_discount,
        discount_percent: body.discount_percent,
        category_id: body.category_id,
        creator: req.decoded.email,
        images: body.images
    };

    // validation of route
    let errors = [];
    if (!params.title) errors.push({missed: api_message().title_required});
    if (!params.price) errors.push({missed: api_message().price_required});
    if (!params.description) errors.push({missed: api_message().description_required});
    if (!params.sizes) errors.push({missed: api_message().sizes_required});
    if (!params.colours) errors.push({missed: api_message().colours_required});
    if (!params.stock) errors.push({missed: api_message().stock_required});
    if (!params.category_id) errors.push({missed: api_message().category_id_required});
    if (!params.images) errors.push({missed: api_message().images_required});

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        // data type validation
        if (params.is_discount){ if (params.discount_percent === null) res.status(400).json({discount_percent: api_message().discount_percent_null}); return;}
        if (typeof params.sizes !== "object") {res.status(400).json({sizes: api_message().list_needed}); return;}
        if (typeof params.colours !== "object") {res.status(400).json({colours: api_message().list_needed}); return;}
        if (typeof params.images !== "object") {res.status(400).json({images: api_message().list_needed}); return;}
        if (!mongoose.Types.ObjectId.isValid(params.category_id)) {res.status(400).json({category_id: api_message().object_id_required}); return;}

        const category = CategoryModel.findOne({_id: params.category_id});
        let res_category = await category.exec();
        if (res_category === null) {res.status(404).json({category_id: api_message().category_not_found}); return;}

        let product = new ProductModel();

        product.info.title = params.title;
        product.info.price = params.price;
        product.info.create_dataTime = new Date().getTime();
        product.info.category = res_category;
        product.meta.description = params.description;
        product.meta.sizes = params.sizes;
        product.meta.colours = params.colours;
        product.meta.stock = params.stock;
        product.meta.creator = params.creator;

        if (params.is_discount) {
            product.meta.is_discount = params.is_discount;
            product.meta.discount_percent = params.discount_percent;
        }else {
            product.meta.is_discount = false
        }

        let images = [];
        for (let i = 0; i < params.images.length; i++){
            let base64Data = params.images[i].replace(/^data:image\/png;base64,/, "");
            let image_name = uuidv4();
            fs.writeFile(`assets/media/private/${image_name}.jpg`, base64Data, 'base64', function(err) {
                if (err) res.status(400).json({images: api_message().image_error_save});
            });
            images.push(`${image_name}.jpg`)

        }

        product.image = images;
        product.save(function (err) {
            if (err) {
                res.status(400).json({error: api_message().server_error})
            } else {
                res.status(201).json({success: api_message().product_saved})
            }
        });
    }
};

const product_get = async function(req, res) {
    const products = ProductModel.find({}).select('-meta.creator -__v -info.category.__v -info.category.creator');
    let res_product = await products.exec();

    res.json(res_product);
};

const product_delete = async function (req, res) {
    let id = req.body.id;
    let user = req.decoded.email;

    if (!mongoose.Types.ObjectId.isValid(id)) {res.status(400).json({id: api_message().object_id_required}); return;}
    let pro = ProductModel.findOne({_id: id});
    let res_pro = await pro.exec();

    if (res_pro === null) {res.status(404).json({not_found: api_message().product_not_found}); return}
    if (res_pro.meta.creator !== user){
        res.status(403).json({permission_denied: api_message().permission_denied})
    }else {
        res_pro.remove(function (err) {
            if (err) {res.status(500).json({server_error: api_message().server_error}); return;}
            for (let i = 0; i < res_pro.image.length; i++) {
                try{
                    fs.unlinkSync(`assets/media/private/${res_pro.image[i]}`)
                }catch (e) {
                    patty.log.danger('warning: in delete product by api v1.0, have an error on removing images')
                }
            }
            res.status(204).json({success: api_message().delete_successfully})
        })
    }
};

const category_post = function(req, res) {
    let body = req.body;
    let params = {
        title: body.title,
        consumer: body.consumer,    // 0 for women  1 for men  2 for kids
        creator: req.decoded.email
    };

    let errors = [];
    if (!params.title) errors.push({error: api_message().title_required});
    if (params.consumer === null) errors.push({error: api_message().consumer_required});

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        if (params.consumer === 1 || params.consumer === 2 || params.consumer === 0) {
            let cat = new CategoryModel();
            cat.title = params.title;
            cat.consumer = params.consumer;
            cat.creator = params.creator;
            cat.save(function (err) {
                if (err){
                    res.status(400).json({error: api_message().server_error})
                }else {
                    res.status(201).json({success: api_message().category_saved})
                }
            })
        } else {
            res.status(400).json({consumer: api_message().consumer_invalid_value})
        }
    }
};

const category_get = async function(req, res) {
    const categories = CategoryModel.find({}).select('-__v -creator');
    let res_category = await categories.exec();

    res.json(res_category);
};

const category_delete = async function(req, res) {
    let id = req.body.id;
    let user = req.decoded.email;

    if (!mongoose.Types.ObjectId.isValid(id)) {res.status(400).json({id: api_message().object_id_required}); return;}
    let cat = CategoryModel.findOne({_id: id});
    let res_cat = await cat.exec();

    if (res_cat === null) {res.status(404).json({not_found: api_message().category_not_found}); return}
    if (res_cat.creator !== user){
        res.status(403).json({permission_denied: api_message().permission_denied})
    }else {
        res_cat.delete(function (err) {
            if (err) {res.status(500).json({server_error: api_message().server_error}); return;}
            res.status(204).json({success: api_message().delete_successfully})
        })
    }
};

module.exports = {
    product_post: product_post,
    category_post: category_post,
    product_get: product_get,
    category_get: category_get,
    category_delete: category_delete,
    product_delete: product_delete
};
