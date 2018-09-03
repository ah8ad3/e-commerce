const i18n = require('../settings/i18');

const locale_md = function (req, res, next) {
    let locale_cookie = req.cookies.locale;
    if (req.body.locale !== undefined){
        i18n.setLocale(req.body.locale);
    }

    if (locale_cookie === undefined){
        res.cookie('locale', 'en');
        i18n.setLocale('en');
    }
    else {
        i18n.setLocale(locale_cookie)
    }
    next()
};

module.exports = locale_md;
