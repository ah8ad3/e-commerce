const i18n = require('./i18');


const internal = {
    setting_import: i18n.__('settings imported'),
    database_connected: i18n.__('database connected'),
    database_error: i18n.__('database cant connect'),
    loaded_in_dev: i18n.__('Project load in dev mode, not use this mode for production mode'),
    in_db_flag_error: i18n.__('Error in DB_FLAG not found or have incorrect value, must be `pro` or `dev` fix it in .env file'),
    secret_key_error: i18n.__('Secret key must be defined in .env and have more than 6 length'),
    redis_error: i18n.__('Error in redis connection'),
    db_name_missed: i18n.__('DB_NAME value in .env file is empty')
};


module.exports = {
    internal: internal
};
