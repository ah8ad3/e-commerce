function danger(text) {
    console.log('\x1b[31m', ` ${text}`);
}

function info(text) {
    console.log('\x1b[32m', ` ${text}`);
}

function regular(text) {
    if (process.env.PD_FLAG === 'dev' || process.env.PD_FLAG === 'test') {
        console.log('\x1b[33m', ` ${text}`);
    }
}


module.exports = {
    danger: danger,
    info: info,
    regular: regular
};
