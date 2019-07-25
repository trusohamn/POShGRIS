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

INSERT INTO restaurant(restaurant_name) values ('Posh Pig');

INSERT INTO users(username, realName, role, password, restaurant_id) values ('marta', 'Marta Trusohamn', 'admin', 'secret', '1');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('sahin', 'Sahin Aslan', 'admin', 'secret', '1');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('peter', 'Peter Hansen', 'employee', 'secret', '1');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('nick', 'Nick Morano', 'employee', 'secret', '1');

INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh pork', '13.99', '1');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh chicken', '15.99', '1');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh shrimp', '19.99', '1');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh beef', '25.99', '1');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh frog', '11.99', '1');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Posh noodles', '16.99', '1');

INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '1', (SELECT NOW() - INTERVAL '1 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '2', (SELECT NOW() - INTERVAL '2 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '3', (SELECT NOW() - INTERVAL '2 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '4', (SELECT NOW() - INTERVAL '3 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '1', (SELECT NOW() - INTERVAL '3 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '1', (SELECT NOW() - INTERVAL '4 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '3', (SELECT NOW() - INTERVAL '7 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '2', (SELECT NOW() - INTERVAL '1 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '1', (SELECT NOW() - INTERVAL '6 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '3', (SELECT NOW() - INTERVAL '5 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '4', (SELECT NOW() - INTERVAL '3 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '4', (SELECT NOW() - INTERVAL '6 DAY'), 'inactive');
INSERT INTO ticket(restaurant_id, table_id, user_id, timestamp, ticket_status) values ('1', '2', '4', (SELECT NOW() - INTERVAL '7 DAY'), 'inactive');

INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('1', '1', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('2', '2', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('3', '3', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('4', '4', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('5', '5', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('1', '6', '1');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('2', '7', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('3', '8', '6');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('4', '9', '2');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('5', '10', '4');
INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ('1', '11', '2');


INSERT INTO restaurant(restaurant_name) values ('Pizzeria Gris');

INSERT INTO users(username, realName, role, password, restaurant_id) values ('mt', 'Marta Trusohamn', 'admin', 'secret', '2');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('sa', 'Sahin Aslan', 'admin', 'secret', '2');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('ph', 'Peter Hansen', 'employee', 'secret', '2');
INSERT INTO users(username, realName, role, password, restaurant_id) values ('nm', 'Nick Morano', 'employee', 'secret', '2');

INSERT INTO product(product_name, product_price, restaurant_id) values ('Margarita', '7.99', '2');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Vesuvio', '7.99', '2');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Capriciosa', '8.99', '2');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Hawaii', '8.99', '2');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Svenne Banan', '9.99', '2');
INSERT INTO product(product_name, product_price, restaurant_id) values ('Kebab', '10.99', '2');


-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 0, 37.52569580078125, 1);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 300.3199768066406, 48.28123474121094, 2);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 402.6958312988281, 346.77227783203125, 10);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 250.07382202148438, 4);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 44.21018981933594, 3);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 0, 700, 8);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 159.2615509033203, 504.7559814453125, 9);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 700, 6);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 158.40005493164062, 201.8931884765625, 11);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 492.12225341796875, 5);
-- INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 295.8090515136719, 700, 7);


INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 0, 100, 1);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 300.3199768066406, 100, 2);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 402.6958312988281, 346.77227783203125, 10);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 250.07382202148438, 4);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 100, 3);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 0, 700, 8);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 159.2615509033203, 504.7559814453125, 9);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 700, 6);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 158.40005493164062, 250, 11);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 600, 492.12225341796875, 5);
INSERT INTO bord(restaurant_id, x, y, table_name) values (1, 295.8090515136719, 700, 7);
