var profile = {};

profile.display = function (req, res) {
  var content = {
    user: 'Dave',
    message: 'This is the mind-blowing profile of'
  };
  res.render('profile', content);
};

module.exports = profile;
