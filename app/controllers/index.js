let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
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
    passport.authenticate('local', (err, user, info) => {
        // server error
        if (err) {
            return next(err);
        }

        // if user login error
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/business-contact');
        })
    })(req, res, next);
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if(!req.user)
  {
      res.render('auth/register',
      {
          title: 'Register',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  }
  else
  {
      return res.redirect('/');
  }
}

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new user({
      username: req.body.username,
      //password: req.body.password
      email: req.body.email,
      displayName: req.body.displayName
  });

  user.register(newUser, req.body.password, (err) => {
      if(err)
      {
          console.log("Error: Inserting New User");
          if(err.name == "UserExistsError")
          {
              req.flash(
                  'registerMessage',
                  'Registration Error: User Already Exists!'
              );
              console.log('Error: User Already Exists!')
          }
          return res.render('auth/register',
          {
              title: 'Register',
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : ''
          });
      }
      else
      {
          return passport.authenticate('local')(req, res, () => {
              res.redirect('/index')
          });
      }
  });
}