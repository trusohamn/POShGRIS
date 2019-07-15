DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS product;

CREATE TABLE restaurant (
   restaurant_id serial PRIMARY KEY,
   restaurant_name VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE users ( 
   user_id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL
);

CREATE TABLE product ( 
   product_id serial PRIMARY KEY,
   restaurant_id INTEGER,
   product_name VARCHAR (50) UNIQUE NOT NULL,
   product_price VARCHAR (20),
   FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

INSERT INTO users(username, password, email) values ('gris', 'secret', 'salty@salt.com');
INSERT INTO users(username, password, email) values ('gris1', 'secret', 'salty1@salt.com');
INSERT INTO users(username, password, email) values ('gris2', 'secret', 'salty2@salt.com');
INSERT INTO users(username, password, email) values ('gris3', 'secret', 'salty3@salt.com');
INSERT INTO users(username, password, email) values ('gris4', 'secret', 'salty4@salt.com');
INSERT INTO users(username, password, email) values ('gris5', 'secret', 'salty5@salt.com');
INSERT INTO users(username, password, email) values ('gris6', 'secret', 'salty6@salt.com');


INSERT INTO restaurant(restaurant_name) values ('Frisky pizzas');
INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky pork', '$66.69', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));

