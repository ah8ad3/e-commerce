const setting = require('../../settings/settings');
const express = require('express');
const router = express.Router();

const passport = setting.passport;
const {message} = require('./messages');
const validator = require('validator');
const {UserModel} = require('./models');


// show the home page (will also have our login links)
router.get('/', function(req, res) {
    // res.render('index.pug');
    res.send(message().hi);
});

router.get('/users', setting.cache.route(5000), function (req, res) {
    UserModel.find({}, function (err, data) {
        res.send(data)
    })
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// local section -----------
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    if (validator.isEmail(email) || validator.isEmpty(pass) === false) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                res.status(500).send({error: message().server_error})
            }
            // Generate a JSON response reflecting authentication status
            if (user === false) {
                res.status(400).send({error: message().wrong_login});
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/auth/profile');
            });
        })(req, res, next);
    }else {
        res.status(400).send({error: message().input_format})
    }
});


router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('SignUpMessage') });
});


router.post('/register', function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    if (validator.isEmail(email) || validator.isEmpty(pass) === false) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                res.status(500).send({error: message().server_error})
            }
            else if (user === false) {
                res.status(400).send({error: message().email_taken});
            }else {
                res.status(201).send(message().register_suc);
            }
        })(req, res, next);
    }else {
        res.status(400).send({error: message().input_format})
    }
});

// google ---------------------------------
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/auth/profile',
        failureRedirect : '/'
    }));

// locally --------------------------------
router.get('/connect/local', function(req, res) {
    res.render('connect-local', { message: req.flash('loginMessage') });
});

router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/auth/profile', // redirect to the secure profile section
    failureRedirect : '/auth/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// google ---------------------------------

// send to google to do the authentication
router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

// the callback after google has authorized the user
router.get('/connect/google/callback',
    passport.authorize('google', {
        successRedirect : '/auth/profile',
        failureRedirect : '/'
    }));

// local -----------------------------------
router.get('/unlink/local', isLoggedIn, function(req, res) {
    const user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function() {
        res.redirect('/auth/profile');
    });
});

// google ---------------------------------
router.get('/unlink/google', isLoggedIn, function(req, res) {
    const user          = req.user;
    user.google.token = undefined;
    user.save(function() {
        res.redirect('/auth/profile');
    });
});


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).send(message().unauthorized);
}


module.exports = router;
