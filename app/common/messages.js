const i18n = require('../../settings/i18');

const m = () => {
    return {
        not_found: i18n.__('Not Found')
    }
};

const api_message = () => {
    return {
        title_required: i18n.__('Title is required'),
        price_required: i18n.__('Price is required'),
        description_required: i18n.__('Description is required'),
        sizes_required: i18n.__('Sizes is required'),
        colours_required: i18n.__('Colours is required'),
        stock_required: i18n.__('Stock is required'),
        category_id_required: i18n.__('Category id is required'),
        list_needed: i18n.__('List type need for this field'),
        images_required: i18n.__('Images is required'),
        object_id_required: i18n.__('Object id type required'),
        category_not_found: i18n.__('Category not found for this id'),
        product_not_found: i18n.__('Product not found for this id'),
        consumer_required: i18n.__('Consumer is required'),
        consumer_invalid_value: i18n.__('Valid values for consumer is 0, 1, 2'),
        category_saved: i18n.__('Category saved successfully'),
        product_saved: i18n.__('Product saved successfully'),
        blog_saved: i18n.__('Blog saved successfully'),
        server_error: i18n.__('Server error'),
        discount_percent_null: i18n.__('Discount is null'),
        image_error_save: i18n.__('Error in save image'),
        permission_denied: i18n.__('Permission denied'),
        delete_successfully: i18n.__('Deleted successfully'),
        html_required: i18n.__('Html is required'),
        introduction_required: i18n.__('Introduction is required'),
        blog_not_found: i18n.__('Blog not found')
    }
};

module.exports = {
    message: m,
    api_message: api_message
};
