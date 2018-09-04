const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const {ProductModel, CategoryModel} = require('../../models');
const {api_message} = require('../../messages');

const product_post = async function (req, res) {
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
        if (params.is_discount) if (params.discount_percent === null) res.status(400).json({discount_percent: api_message().discount_percent_null});
        if (typeof params.sizes !== "object") res.status(400).json({sizes: api_message().list_needed});
        if (typeof params.colours !== "object") res.status(400).json({colours: api_message().list_needed});
        if (typeof params.images !== "object") res.status(400).json({images: api_message().list_needed});
        if (!mongoose.Types.ObjectId.isValid(params.category_id)) res.status(400).json({category_id: api_message().object_id_required});

        const category = CategoryModel.findOne({_id: params.category_id});
        let res_category = await category.exec();
        if (res_category === null) res.status(400).json({category_id: api_message().category_not_found});

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
            require("fs").writeFile(`assets/media/private/${image_name}.jpg`, base64Data, 'base64', function(err) {
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

const category_post = function(req, res) {
    let body = req.body;
    let params = {
        title: body.title,
        consumer: body.consumer    // 0 for women  1 for men  2 for kids
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


module.exports = {
    product_post: product_post,
    category_post: category_post
};
