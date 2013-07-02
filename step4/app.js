var express = require('express');
var app = express();
var everyauth = require('everyauth');

var index = require('./lib/routes/index');
var profile = require('./lib/routes/profile');

mysqlClient = require('./lib/mysqlClient');

everyauth.everymodule
  .findUserById( function (userId, callback) {
    mysqlClient.query('SELECT id, name, email, photo_url FROM users WHERE id = ?', [userId], function (err, rows) {
      if (err) {
        callback(err, null);
        return;
      }

      if (!rows || !rows.length) {
        callback(new Error('no such user'), null);
        return;
      }

      callback(null, rows[0]);
    });
  });

everyauth.facebook
  .appId('292564027555701')
  .appSecret('daa601fc2a91eb5970bcf6e7a424e1c1')
  .scope('email')
  .fields('id,name,email,picture')
  .handleAuthCallbackError( function (req, res) {
    res.redirect('/facebook-fail');
  })
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    var values = {
      fb_access_token: accessToken,
      name: fbUserMetadata.name,
      email: fbUserMetadata.email,
      photo_url: fbUserMetadata.picture.data.url
    };
    var promise = this.Promise();
    mysqlClient.query('SELECT id, name, email, photo_url FROM users WHERE email = ?', [values.email], function (err, rows) {
      if (err) {
        promise.fail(err);
        return;
      }

      if (rows && rows.length) {
        // Already have this user, set up the user object and move on
        promise.fulfill(rows[0]);
        return;
      }

      // new user, save them and move on
      mysqlClient.query('INSERT INTO users SET ?', [values], function (err, result) {
        if (err) {
          promise.fail(err);
          return;
        }

        if (!result || !result.affectedRows) {
          promise.fail(new Error('User was not saved'));
          return;
        }

        promise.fulfill(values);
      });
    });
    return promise;
  })
  .redirectPath('/profile');

app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession());
app.use(everyauth.middleware());
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  console.log(req.loggedIn);
  console.log(/\/profile/.test(req.originalUrl));
  if (/\/profile/.test(req.originalUrl) && !req.loggedIn) {
    res.redirect('/');
    return;
  }

  next();
});
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', index.homepage);
app.get('/profile', profile.display);

app.listen(3000);
console.log("Express app running on http://localhost:3000");
