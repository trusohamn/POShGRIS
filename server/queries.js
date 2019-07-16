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
      console.log(results.rows[0].restaurant_id);
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
    console.log(results.rows)
    res.status(201).send({ results: results.rows });
  });
};

const getTicketById = (req, res) => {
    const ticket_id = req.params.id;
    pool.query(`select pt.quantity, p.product_name, p.product_price from product_in_ticket as pt 
    inner join product as p on pt.product_id = p.product_id
    where pt.ticket_id=$1 ;
    `, 
    [ticket_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      console.log(results.rows)
      res.status(201).send({ results: results.rows });
    });
}


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

module.exports = {
  createRestaurant,
  getProducts,
  createProduct,
  getTickets,
  getTicketById
};
