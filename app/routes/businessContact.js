let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');
let businessContactController = require('../controllers/businessContact');

// function to check if login
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

router.get('/', businessContactController.businessContactDisplay);

// add functions are not included in the requirement of this phase
// router.get('/add', requireAuth, businessContactController.businessContactAdd);

// router.post('/add', requireAuth, businessContactController.businessContactAddProcess);

router.get('/edit/:id', businessContactController.businessContactEdit);

router.post('/edit/:id', businessContactController.businessContactEditProcess);

router.get('/delete/:id', businessContactController.businessContactDelete);

module.exports = router;