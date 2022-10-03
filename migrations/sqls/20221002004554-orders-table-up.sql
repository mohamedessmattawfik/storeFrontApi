CREATE TYPE Status AS ENUM ('completed', 'inProgress', 'closed');
CREATE TABLE orders (
    id SERIAl PRIMARY KEY,
    status Status,
    user_id BIGINT REFERENCES users(id)
);