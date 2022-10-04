# Storefront Backend Project
This is the second project of the advanced web development nano degree offered by udacity . The project is an ecommerce web site api which delivers all the required services for the website . 

All of the information about the api such as the `documentation` and the `database schema` can be found in the [requirements](REQUIREMENTS.md) file . 

# 
# Project Setup: 
## Database Setup :

First let's create a new user using psql: 
 - open your terminal and type : 
```bash
 su postgres
  ```
- start psql  by typing : 
```bash
psql postgres
```
- Type: 
```SQL
CREATE USER shop_owner WITH PASSWORD 'root';
```
```SQL
CREATE DATABASE storefront;
```
```SQL
\c storefront;
```
```SQL
GRANT ALL PRIVILEGES ON DATABASE storefront TO shop_owner;
```
```SQL 
CREATE DATABASE storefront_test;
```
```
\c storefront_test
```
```SQL
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO shop_owner;
```
The Database is now running on `localhost` => `127.0.0.1` and on port `5432` which is the default port for postgres.
## App Setup :
- install `yarn` :
```node
npm inistall yarn -g
```
- install db-migrate on the machine for terminal commands 
```node
npm install db-migrate -g
```
- install all project dependencies 
```
yarn
```
- To migrate all tables run : 
```node
db-migrate up
```

To run the app on port `3000` run : 
```node
yarn watch
```
and the app will be running .

In order to run all tests run: 
```node
yarn test
```

Enviroment Variables : 

POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER = shop_owner
POSTGRES_PASSWORD = root
BCRYPT_PASSWORD=secretPassword
SALT_ROUNDS=10
TOKEN_SECRET=aloha123
ENV=dev
