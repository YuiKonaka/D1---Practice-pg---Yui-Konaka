DROP TABLE IF EXISTS cart_items CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL
  );

CREATE TABLE
  products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price INTEGER,
    description TEXT,
    image TEXT
  );

CREATE TABLE
  cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    product_id INTEGER REFERENCES products (id),
    quantiy INTEGER NOT NULL
  );