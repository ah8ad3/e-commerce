const i18n = require('i18n');

i18n.configure({
    locales:['en', 'fa'],
    directory: __dirname + '/locales',
    defaultLocale: 'en'
});


module.exports = i18n;
