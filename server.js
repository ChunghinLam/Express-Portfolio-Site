var express = require('express');
var app = express();
app.use('/', function(req, res) {
res.send('Hello World');
});
app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;

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