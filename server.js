let express = require('./app');

let app = express();
app.listen(process.env.PORT || 3000);
module.exports = app;

console.log('Server running now.');