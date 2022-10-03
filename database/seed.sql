-- User Tables Seeding
INSERT INTO users (firstname, lastname, password) VALUES ('TestUser1', 'Test', 'TestPassword');
INSERT INTO users (firstname, lastname, password) VALUES ('TestUser2', 'Test', 'TestPassword');
INSERT INTO users (firstname, lastname, password) VALUES ('TestUser3', 'Test', 'TestPassword');
INSERT INTO users (firstname, lastname, password) VALUES ('TestUser4', 'Test', 'TestPassword');
INSERT INTO users (firstname, lastname, password) VALUES ('TestUser5', 'Test', 'TestPassword');
INSERT INTO users (firstname, lastname, password) VALUES ('TestUser6', 'Test', 'TestPassword');

-- Product Table Seed
INSERT INTO products (name, price, category) VALUES ('TestProduct1', 150, 'test');
INSERT INTO products (name, price, category) VALUES ('TestProduct2', 150, 'test');
INSERT INTO products (name, price, category) VALUES ('TestProduct3', 150, 'test');
INSERT INTO products (name, price, category) VALUES ('TestProduct4', 150, 'test');
INSERT INTO products (name, price, category) VALUES ('TestProduct5', 150, 'test');
INSERT INTO products (name, price, category) VALUES ('TestProduct6', 150, 'test');

-- Order Table Seed
INSERT INTO orders (user_id, status) VALUES (1, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (1, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (2, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (2, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (3, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (3, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (4, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (4, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (5, 'inProgress');
INSERT INTO orders (user_id, status) VALUES (6, 'inProgress');

-- OrderProducts Table Seed
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 1, 1);
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 1, 2);
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 1, 3);
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 1, 4);
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 2, 2);
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 2, 1);
INSERT INTO order_products (quantity, order_id, product_id ) VALUES (10, 3, 1);