let express = require('./config/app');

//passport = require('./config/passport');
//let passport = passport();

let app = express();
app.listen(process.env.PORT || 3000);
module.exports = app;

console.log('Server running now.');

// let app = require('./config/app');
// let http = require('http');

// //passport = require('./config/passport');
// //let passport = passport();

// var port = normalizePort(process.env.PORT || 3000);
// app.set('port', port);

// var server = http.createServer(app);
// server.listen(port);
// server.on('listening', onListening);

// // let app = express();
// // app.listen(process.env.PORT || 3000);
// module.exports = app;

// function normalizePort(val) {
//     var port = parseInt(val, 10);
// }

// console.log('Server running now.');