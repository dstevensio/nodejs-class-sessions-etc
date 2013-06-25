var express = require('express');
var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var content = {
    message: 'Welcome to the next big thing!'
  };
  res.render('index', content);
});

app.get('/profile', function (req, res) {
  var content = {
    user: 'Dave',
    message: 'This is the mind-blowing profile of'
  };
  res.render('profile', content);
});

app.listen(3000);
console.log("Express app running on http://localhost:3000");
