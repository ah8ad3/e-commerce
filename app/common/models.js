const mongoose = require('mongoose');

const {UserModel} = require('../user/models');

const categorySchema = mongoose.Schema({
    title: String,
    consumer: Number   // 0 for women   1 for men   2 for kids
});


const productSchema = mongoose.Schema({
    info: {
        title: String,
        category: categorySchema,
        price: String,
        is_mobile_verified: Boolean,
        create_dataTime: Date,
    },
    meta: {
        description: String,
        sizes: [String],
        colours: [String],
        stock: Number,
        is_discount: Boolean,
        discount_percent: Boolean,
        creator: UserModel
    },
    image: [{data: Buffer, contentType: String}]
});


const ProductModel = mongoose.model('Product', productSchema);
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = {
    ProductModel: ProductModel,
    CategoryModel: CategoryModel
};
