const fs = require('fs');

const express = require('express');
const router = express.Router();

const {message} = require('./messages');
const {p_storage} = require('../../settings/settings');


router.get('/', function(req, res) {
    res.render('common/index.html');
});

router.get('/download/:file_name', function (req, res) {
    let file = `${p_storage}${req.params.file_name}`;
    if (fs.existsSync(file)) {
        res.download(file);
    }else {
        res.status(404).send(message().not_found)
    }
});

module.exports = router;
