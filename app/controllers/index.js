let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let bcrypt = require('bcryptjs');
//let LocalStrategy = require('passport').LocalStrategy;
let LocalStrategy = require('passport-local').Strategy;

// create ser model instance
let userModel = require('../models/user');
let user = userModel.user;

module.exports.homePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.aboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : '' });
}

module.exports.projectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : '' });
}

module.exports.servicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.contactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

module.exports.loginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    } else {
        return res.redirect('/');
    }
}

module.exports.loginPageProcess = (req, res, next) => {
    //passport.use(user.createStrategy());
    //console.log(res);
    passport.use(new LocalStrategy(function(username, password, cb) {
        // Locate user first here
        bcrypt.compare(password, user.password, function(err, res) {
          if (err) return cb(err);
          if (res === false) {
            return res.redirect('/login');
          } else {
            return res.redirect('/contact');
          }
        });
      }));

    // passport.authenticate('local', (err, user, info) => {
    //     console.log('info: ' + info);
    //     // server error
    //     if (err) {
    //         return next(err);
    //     }

    //     // if user login error
    //     if (!user) {
    //         req.flash('loginMessage', 'Authentication Error...');
    //         return res.redirect('/login');
    //     }

    //     req.login(user, (err) => {
    //         if (err) {
    //             return next(err);
    //         }

    //         return res.redirect('/contact');
    //     })
    // })(req, res, next);
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}