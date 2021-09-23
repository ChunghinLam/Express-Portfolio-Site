exports.render = function(req, res) { 
  res.render('index', {
    title: 'Hello World'
  })
  // res.send('Hello World'); 
};