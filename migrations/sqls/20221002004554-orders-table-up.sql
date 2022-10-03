CREATE TABLE orders (
    id SERIAl PRIMARY KEY,
    status VARCHAR(50),
    user_id BIGINT REFERENCES users(id),
);