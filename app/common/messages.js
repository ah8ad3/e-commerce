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
        category_id_required: i18n.__('Category id is required')
    }
};

module.exports = {
    message: m,
    api_message: api_message
};
