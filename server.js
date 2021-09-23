let express = require('./config/express');

let app = express();
app.listen(process.env.PORT || 3000);
// console.log(process.env.PORT);
module.exports = app;

console.log('Server running at http://localhost:3000/');

// const http = require('http');
// http.createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   res.end('Hello World');
// }).listen(3000);

// console.log('Server 1 running at http://localhost:3000');

// const connect = require('connect');
// const app = connect();
// app.listen(3000);
// console.log('Server 2 running at http://localhost:3000/');