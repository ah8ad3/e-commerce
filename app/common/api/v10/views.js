const {ProductMode, CategoryModel} = require('../../models');
const {api_message} = require('../../messages');

const product_post = function (req, res) {
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
        creator: req.decoded.email
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

    if (errors.length > 0){
        res.status(400).json(errors);
    } else {
        res.json({success: 'you get first private post message'})
    }
};


module.exports = {
    product_post: product_post
};
