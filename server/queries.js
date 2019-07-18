const { Pool } = require("pg");
const connectionSettings =
  process.env.NODE_ENV === "production"
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
    : {
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "docker",
      port: 5432
    };
const pool = new Pool(connectionSettings);

const createRestaurant = (req, res) => {
  const { restaurant_name } = req.body;

  pool.query(
    "INSERT INTO restaurant(restaurant_name) values ($1) RETURNING restaurant_id;",
    [restaurant_name],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.cookie("restaurant_id", results.rows[0].restaurant_id);
      res.status(201).send({ message: "Restaurant added" });
    }
  );
};

const getProducts = (req, res) => {
  pool.query("SELECT * FROM PRODUCT", (error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({ results: results.rows });
  });
};

const getTickets = (req, res) => {
  pool.query("SELECT * FROM TICKET", (error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({ results: results.rows });
  });
};

const getTicketById = (req, res) => {
  const ticket_id = req.params.id;
  pool.query(
    `select pt.quantity, p.product_name, p.product_price from product_in_ticket as pt 
    inner join product as p on pt.product_id = p.product_id
    where pt.ticket_id=$1 ;
    `,
    [ticket_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({ results: results.rows });
    }
  );
};

const createProduct = (req, res) => {
  const { product_name, product_price } = req.body;
  const { restaurant_id } = req.cookies;
  console.log(product_name, product_price, restaurant_id);
  pool.query(
    "INSERT INTO product(product_name, product_price, restaurant_id) values ($1, $2, $3);",
    [product_name, product_price, restaurant_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({ message: "Product added" });
    }
  );
};

const addProductsToTicket = (req, res) => {
  const products = JSON.parse(req.body.products);
  const ticket_id = req.params.id;
  pool.query(
    "DELETE FROM product_in_ticket WHERE ticket_id=$1;",
    [ticket_id],
    (error, results) => {
      if (error) return res.status(401).send(error.message);
      try {
        products.forEach(e => {
          pool.query(
            "INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ($1, $2, $3);",
            [e.product_id, ticket_id, e.quantity],
            (error, results) => {
              if (error) {
                // throw new Error('something went wrong');
                console.log('something went wrrrong');
              }
            });
        });
        res.status(201).send({ message: "Product added" });
      } catch (err) {
        return res.status(401).send(error.message);
      }
    });
};

const createBord = (req, res) => {
  const { restaurant_id } = req.cookies;
  const table_name = req.body.table_name;
  const x = 0;
  const y = 0;
  pool.query(
    "INSERT INTO bord(restaurant_id, x, y, table_name) values  ($1, $2, $3, $4)  RETURNING table_id;",
    [restaurant_id, x, y, table_name],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({ message: "Bord added", table_id: results.rows[0].table_id, x, y, table_name });
    }
  );
};

const getBords = (req, res) => {
  pool.query("SELECT * FROM BORD", (error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({ results: results.rows });
  });
};

const updateBords = (req, res) => {
  //const { restaurant_id } = req.cookie;
  const restaurant_id = 1;
  const bords = JSON.parse(req.body.bords);
  pool.query(
    "DELETE FROM bord;", // add restaurant_id so that you only delete 1 restaurants tables thank you peter cheers!!!!!!!!!!!!!!!
    (error, results) => {
      if (error) return res.status(401).send(error.message);
      bords.forEach(e => {
        pool.query(
          "INSERT INTO bord(x, y, table_name, restaurant_id) values ($1, $2, $3, $4);",
          [e.x, e.y, e.table_name, restaurant_id],
          (error, results) => {
            if (error) return res.status(401).send(error.message);
          });
      });
      res.status(201).send({ message: "Layout changed" });
    });
};

const createTicket = (req, res) => {

  const { restaurant_id } = req.cookies;
  const { user_id } = req.cookies;
  const { table_id } = req.body;
  pool.query(
    "INSERT INTO ticket(restaurant_id, user_id, table_id) values  ($1, $2, $3)  RETURNING ticket_id;",
    [restaurant_id, user_id, table_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({ message: "Ticket created", ticket_id: results.rows[0].ticket_id });
    }
  );
};


module.exports = {
  createRestaurant,
  getProducts,
  createProduct,
  getTickets,
  getTicketById,
  addProductsToTicket,
  getBords,
  createBord,
  updateBords,
  createTicket
};
