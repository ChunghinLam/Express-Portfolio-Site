let express = require('express');
// const { authenticate } = require('passport');
let router = express.Router();

let indexController = require('../controllers/index');

router.get('/', indexController.homePage);
router.get('/home', indexController.homePage);
router.get('/about', indexController.aboutPage);
router.get('/projects', indexController.projectsPage);
router.get('/services', indexController.servicesPage);
router.get('/contact', indexController.contactPage);

// auth pages
router.get('/login', indexController.loginPage);
router.post('/login', indexController.loginPageProcess);
router.get('/logout', indexController.logout);

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Home'});
// });

// router.get('/about', function(req, res, next) {
//     res.render('about', { title: 'About'});
// });

// router.get('/projects', function(req, res, next) {
//     res.render('projects', { title: 'Projects'});
// });

// router.get('/services', function(req, res, next) {
//     res.render('services', { title: 'Services'});
// });

// router.get('/contact', function(req, res, next) {
//     res.render('contact', { title: 'Contact'});
// });

// router.get('/login', function(req, res, next) {
//     res.render('login', { title: 'Login'});
// });

module.exports = router;