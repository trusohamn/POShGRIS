DROP TABLE IF EXISTS product_in_ticket;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bord;
DROP TABLE IF EXISTS restaurant;

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

CREATE TABLE ticket ( 
   ticket_id serial PRIMARY KEY,
   restaurant_id INTEGER,
   table_id INTEGER,
   user_id INTEGER,
   ticket_status VARCHAR (20),
   notes VARCHAR(400),
   FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
   FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE product_in_ticket ( 
   pt_id serial PRIMARY KEY,
   product_id INTEGER,
   ticket_id INTEGER,
   quantity INTEGER,
   FOREIGN KEY (product_id) REFERENCES product(product_id),
   FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
);

CREATE TABLE bord ( 
   table_id serial PRIMARY KEY,
   restaurant_id INTEGER,
   x INTEGER,
   y INTEGER,
   table_name VARCHAR (20),
   FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

INSERT INTO users(username, password, email) values ('gris', 'secret', 'salty@salt.com');

INSERT INTO restaurant(restaurant_name) values ('Frisky pizzas');

INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky pork', '$66.69', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky chicken', '$13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky shrimp', '$66.69', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky beef', '$66.69', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky frog', '$66.69', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('frisky noodles', '$66.69', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));


INSERT INTO ticket(restaurant_id, table_id, user_id) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), '2', (SELECT user_id FROM users WHERE username = 'gris'));

INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'frisky pork'), '1', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'frisky shrimp'), '1', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'frisky noodles'), '1', '2');

INSERT INTO bord(restaurant_id, x, y, table_name) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), 200, 300, 'a great table');
INSERT INTO bord(restaurant_id, x, y, table_name) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), 100, 100, '1');
