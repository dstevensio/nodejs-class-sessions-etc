var index = {};

index.homepage = function (req, res) {
  var content = {
    message: 'Welcome to the next big thing!'
  };
  res.render('index', content);
};

module.exports = index;
