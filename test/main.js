//During the test the env variable is set to test
process.env.PD_FLAG = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let {app} = require('../app');
chai.should();

chai.use(chaiHttp);

/*
*  Just import apps test here like above
* */


// test for user app
require('../app/user/test')(chai, app);

// test for common app
require('../app/common/test')(chai, app);

// test for settings
require('../settings/test')(chai, app);

// test libs
require('../lib/test')(chai, app);