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

// reister functions is not in the requirement, but it is needed to create user
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);

module.exports = router;