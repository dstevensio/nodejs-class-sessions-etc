CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  fb_access_token TEXT NOT NULL DEFAULT '',
  twitter_access_token TEXT NOT NULL DEFAULT '',
  email VARCHAR(255) NOT NULL,
  photo_url TEXT NOT NULL DEFAULT '',
  twitter_metadata TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

INSERT INTO users (name, email) VALUES
('Dave', 'dstevens@zappos.com');
