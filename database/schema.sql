CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE dishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  photo TEXT,
  description TEXT,
  allergies TEXT,
  prezzo NUMERIC
);

CREATE TABLE cart_dish (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart(id),
  dish_id INTEGER REFERENCES dishes(id),
  quantity INTEGER NOT NULL DEFAULT 1
);