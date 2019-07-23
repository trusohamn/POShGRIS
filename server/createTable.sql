DROP TABLE IF EXISTS product_in_ticket;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bord;
DROP TABLE IF EXISTS restaurant;

SET timezone TO 'Europe/Stockholm';
ALTER DATABASE postgres SET timezone TO 'Europe/Stockholm';

CREATE TABLE restaurant (
   restaurant_id serial PRIMARY KEY,
   restaurant_name VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE users ( 
   user_id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   realName VARCHAR (50),
   password VARCHAR (50) NOT NULL,
   role VARCHAR (50) NOT NULL, 
   restaurant_id INTEGER,
   FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE product ( 
   product_id serial PRIMARY KEY,
   restaurant_id INTEGER,
   product_name VARCHAR (50) UNIQUE NOT NULL,
   product_price DECIMAL,
   FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE ticket ( 
   ticket_id serial PRIMARY KEY,
   restaurant_id INTEGER,
   table_id INTEGER,
   user_id INTEGER,
   ticket_status VARCHAR (20),
   notes VARCHAR(400),
   timestamp timestamp NOT NULL DEFAULT NOW(),
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
   x DECIMAL,
   y DECIMAL,
   table_name VARCHAR (20),
   FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

INSERT INTO restaurant(restaurant_name) values ('Frisky pizzas');
INSERT INTO restaurant(restaurant_name) values ('Posh pizzas');

INSERT INTO users(username, realName, role, password, restaurant_id) values ('gris', 'The GRIS', 'admin', 'secret', '1');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('poshgris', 'The Posh GRIS', 'admin', 'secret', '2');


INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh pork', '13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh chicken', '13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh shrimp', '13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Posh pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh beef', '13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Posh pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh frog', '13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Posh pizzas'));
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh noodles', '13.37', (SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Posh pizzas'));


INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), '2', (SELECT user_id FROM users WHERE username = 'gris'), (SELECT NOW() - INTERVAL '1 DAY'));
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), '2', (SELECT user_id FROM users WHERE username = 'gris'), (SELECT NOW() - INTERVAL '2 DAY'));
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), '2', (SELECT user_id FROM users WHERE username = 'gris'), (SELECT NOW() - INTERVAL '2 DAY'));
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), '2', (SELECT user_id FROM users WHERE username = 'gris'), (SELECT NOW() - INTERVAL '3 DAY'));

INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'Posh pork'), '1', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'Posh chicken'), '2', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'Posh chicken'), '3', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'Posh chicken'), '4', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ((SELECT product_id FROM product WHERE product_name = 'Posh chicken'), '1', '2');


INSERT INTO bord(restaurant_id, x, y, table_name) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), 200, 100, 'bar');
INSERT INTO bord(restaurant_id, x, y, table_name) values ((SELECT restaurant_id FROM restaurant WHERE restaurant_name = 'Frisky pizzas'), 100, 50, 'kitchen');
