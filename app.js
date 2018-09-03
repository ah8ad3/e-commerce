const express = require('express');
const app = express();
require('dotenv').config();
const set = require('./settings/settings');

const http_server = require('./lib/http_server')(app);

// import all settings here
set.settings(app, express);

// import urls to project
require('./settings/urls')(app, http_server.io, express);


module.exports = {
    app: app,
    server: http_server.server
};
