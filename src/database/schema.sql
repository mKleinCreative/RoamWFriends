DROP DATABASE IF EXISTS roamwfriends;
CREATE DATABASE roamwfriends;

\c roamwfriends;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(150) NOT NULL,
  user_image TEXT DEFAULT '/images/default-user.png',
  date_joined TIMESTAMP DEFAULT now(),
  current_city TEXT,
  name TEXT
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  title VARCHAR(30) NOT NULL,
  body VARCHAR(255) NOT NULL,
  city VARCHAR(30) NOT NULL,
  time_posted TIMESTAMP DEFAULT now()
);

DROP TABLE IF EXISTS type_of_review;
CREATE TABLE type_of_review (
  id SERIAL PRIMARY KEY,
  type_name VARCHAR(30) NOT NULL
);

ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE reviews ADD FOREIGN KEY (type_id) REFERENCES "type_of_review" ("id");
