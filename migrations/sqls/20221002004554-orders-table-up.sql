CREATE TYPE StatusENUM AS ENUM ('completed', 'inProgress', 'closed');
CREATE TABLE orders (
    id SERIAl PRIMARY KEY,
    status StatusENUM,
    user_id BIGINT REFERENCES users(id)
);