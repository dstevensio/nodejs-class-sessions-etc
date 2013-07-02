var mysql = require('mysql');
var options = {
  database: 'next_big_thing',
  host: 'localhost',
  user:'root',
  password: process.env.DBPASS
};
var pool = mysql.createPool(options);

var mysqlClient = {};

mysqlClient.query = function (sql, params, callback) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query(sql, params, function () {
      callback.apply(this, arguments);

      connection.end();
    });
  });
};

module.exports = mysqlClient;
