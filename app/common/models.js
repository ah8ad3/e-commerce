const mongoose = require('mongoose');

const {UserModel} = require('../user/models');

const categorySchema = mongoose.Schema({
    title: String,
    consumer: Number,   // 0 for women   1 for men   2 for kids
    creator: String
});


const productSchema = mongoose.Schema({
    info: {
        title: String,
        category: categorySchema,
        price: String,
        create_dataTime: Date,
    },
    meta: {
        description: String,
        sizes: [String],
        colours: [String],
        stock: Number,
        is_discount: Boolean,
        discount_percent: Boolean,
        creator: String     // email or username of user must be here
    },
    image: [String]
});


const blogSchema = mongoose.Schema({
    title: String,
    html: String,   // store ck-editor output here
    creator: String,
    introduction: String,
    create_dataTime: Date
});


const ProductModel = mongoose.model('Product', productSchema);
const CategoryModel = mongoose.model('Category', categorySchema);
const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = {
    ProductModel: ProductModel,
    CategoryModel: CategoryModel,
    BlogModel: BlogModel
};
