var express = require('express');
var app = express();
var mysql = require('mysql');

var index = require('./lib/routes/index');
var profile = require('./lib/routes/profile');

app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var options = {
  database: 'next_big_thing',
  host: 'localhost',
  user:'root',
  password: process.env.DBPASS
};
var pool = mysql.createPool(options);
mysqlClient = {};

mysqlClient.query = function (sql, params, callback) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query(sql, params, function () {
      callback.apply(this, arguments);

      connection.end();
    });
  });
};

mysqlClient.query('SELECT * FROM users', function (err, rows) {
  if (err) throw err;

  if (rows && rows.length) {
    rows.forEach(function (row, i) {
      console.log('Row ' + i);
      console.log(row);
    });
  }
});

var values = {
  name: 'Bob',
  email: 'bob@bob.com'
};
mysqlClient.query('INSERT INTO users SET ?', [values], function (err, result) {
  if (err) throw err;

  if (!result || !result.affectedRows) {
    console.log('Query failed!');
    return;
  }

  console.log('Query succeeded, ' + result.affectedRows + ' rows affected');

});

app.get('/', index.homepage);
app.get('/profile', profile.display);

app.listen(3000);
console.log("Express app running on http://localhost:3000");
