INSERT INTO
  users (id, email, password)
VALUES
  (1, "user1@example.com", "password123")
INSERT INTO
  users (id, email, password)
VALUES
  (2, "user2@example.com", "password456")
INSERT INTO
  products (id, title, price, description, image)
VALUES
  (
    1,
    "Product 1",
    100,
    "Description for product 1",
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  )
INSERT INTO
  products (id, title, price, description, image)
VALUES
  (
    2,
    "Product 2",
    200,
    "Description for product 2",
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  )
INSERT INTO
  products (id, title, price, description, image)
VALUES
  (
    3,
    "Product 3",
    300,
    "Description for product 3",
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  )
INSERT INTO
  cart_items (id, user_id, product_id, quantiy)
VALUES
  (1, 1, 2, 2)
INSERT INTO
  cart_items (id, user_id, product_id, quantiy)
VALUES
  (2, 2, 3, 1)