CREATE TABLE orders (
    id SERIAl PRIMARY KEY,
    status ENUM('completed', 'inProgress') DEFAULT 'inProgress',
    user_id BIGINT REFERENCES users(id),
);