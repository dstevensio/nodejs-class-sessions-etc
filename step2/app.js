var express = require('express');
var app = express();

var index = require('./lib/routes/index');
var profile = require('./lib/routes/profile');

app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

mysqlClient = require('./lib/mysqlClient');

app.get('/', index.homepage);
app.get('/profile', profile.display);

app.listen(3000);
console.log("Express app running on http://localhost:3000");
