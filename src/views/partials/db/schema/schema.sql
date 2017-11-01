
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  email TEXT UNIQUE,
  user_image TEXT DEFAULT 'http://via.placeholder.com/250x250',
  logged TIMESTAMP DEFAULT now()
);

CREATE TABLE albums(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE reviews(
  id SERIAL PRIMARY KEY,
  albums_id INT REFERENCES albums,
  review TEXT,
  users_id INT REFERENCES users,
  logged TIMESTAMP DEFAULT now()
);
