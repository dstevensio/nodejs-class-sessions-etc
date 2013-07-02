var express = require('express');
var app = express();

var index = require('./lib/routes/index');
var profile = require('./lib/routes/profile');

app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

mysqlClient = require('./lib/mysqlClient');

mysqlClient.query('SELECT * FROM users', function (err, rows) {
  if (err) throw err;

  if (rows && rows.length) {
    rows.forEach(function (row, i) {
      console.log('Row ' + i);
      console.log(row);
    });
  }
});

app.get('/', index.homepage);
app.get('/profile', profile.display);

app.listen(3000);
console.log("Express app running on http://localhost:3000");

var mysql = require('mysql');
var options = {
  database: 'next_big_thing',
  host: 'localhost',
  user:'root',
  password: process.env.DBPASS
};
var pool = mysql.createPool(options);
