const {
  Pool
} = require("pg");
const connectionSettings =
  process.env.NODE_ENV === "production" ? {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  } : {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "docker",
    port: 5432
  };
const pool = new Pool(connectionSettings);

const getRestaurantIdAndRole = (req, res, next) => {
  const {
    user_id
  } = req.cookies;

  pool.query(
    "SELECT role, restaurant_id FROM users WHERE user_id=$1",
    [user_id],
    (error, results) => {
      req.restaurant_id = null;
      req.role = null;

      if (error) return next(error);
      req.role = results.rows[0].role;
      req.restaurant_id = results.rows[0].restaurant_id;
      next();
    }
  )
}

const queryCreateUser = (restaurant_id, username, realName, password, role, cb) => {
  console.log(restaurant_id, username, realName, password, role);
  pool.query(
    "INSERT INTO users (restaurant_id, username, realName, password, role) values ($1, $2, $3, $4, $5) RETURNING user_id;",
    [restaurant_id, username, realName, password, role],
    (error, results) => {
      if (error) {
        console.log(error);
        return cb(error.message);
      }
      cb(null, results.rows[0].user_id);
    });
}

const createRestaurant = (req, res) => {
  const {
    restaurant_name,
    username,
    password,
    realName
  } = req.body;
  const role = 'admin';

  console.log('creating restaurant');
  pool.query(
    "INSERT INTO restaurant(restaurant_name) values ($1) RETURNING restaurant_id;",
    [restaurant_name],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      const restaurant_id = results.rows[0].restaurant_id;

      queryCreateUser(restaurant_id, username, realName, password, role, (err, user_id) => {
        if (err) return res.status(401).send(error.message);
        res.cookie("user_id", user_id);
        res.cookie("role", role);
        res.status(201).send({
          message: "Restaurant and admin added"
        });
      });
    });
};

const getRestaurant= (req, res) => {
  pool.query(
    "SELECT restaurant_name from restaurant where restaurant_id=$1",
    [req.restaurant_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({
        results: results.rows[0].restaurant_name
      });
    });
};

const createUser = (req, res) => {

  if(req.role != 'admin')return res.status(401).send('no access');

  const {
    username,
    password,
    role,
    realName
  } = req.body;
console.log('*********', req.restaurant_id, username, realName, password, role)
  queryCreateUser(req.restaurant_id, username, realName, password, role, (err, user_id) => {
    if (err) return res.status(401).send(err.message);
    res.status(201).send({
      message: "User added"
    });
  });

};

const getProducts = (req, res) => {

      pool.query("SELECT * FROM PRODUCT WHERE restaurant_id=$1", [req.restaurant_id], (error, results) => {
        if (error) {
          return res.status(401).send(error.message);
        }
        res.status(201).send({
          results: results.rows
        });
      });
};

const getTickets = (req, res) => {

  pool.query("SELECT * FROM TICKET WHERE restaurant_id=$1", [req.restaurant_id],(error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({
      results: results.rows
    });
  });
};

const getTicketsStats = (req, res) => {
  pool.query(`SELECT t.ticket_id, p.product_id, p.product_name, p.product_price, pt.quantity, t.timestamp, t.user_id 
  FROM TICKET as t 
  INNER JOIN product_in_ticket as pt on pt.ticket_id = t.ticket_id
  INNER JOIN product as p on pt.product_id = p.product_id
  WHERE t.restaurant_id=$1;`, [req.restaurant_id],(error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({
      results: results.rows
    });
  });
}

const getTicketById = (req, res) => {
  const ticket_id = req.params.id;
  pool.query(
    `select pt.quantity, p.product_name, p.product_price from product_in_ticket as pt 
    inner join product as p on pt.product_id = p.product_id
    where pt.ticket_id=$1 and p.restaurant_id=$2 ;
    `,
    [ticket_id, req.restaurant_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({
        results: results.rows
      });
    });
};

const createProduct = (req, res) => {
  const {
    product_name,
    product_price
  } = req.body;
  
  pool.query(
    "INSERT INTO product(product_name, product_price, restaurant_id) values ($1, $2, $3);",
    [product_name, product_price, req.restaurant_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({
        message: "Product added"
      });
    }
  );
};

const addProductsToTicket = (req, res) => {
  const products = JSON.parse(req.body.products);
  const ticket_id = req.params.id;
  pool.query(
    "DELETE FROM product_in_ticket WHERE ticket_id=$1;", // join with ticket!!!
    [ticket_id],
    (error, results) => {
      if (error) return res.status(401).send(error.message);
      try {
        products.forEach(e => {
          console.log(e.product_id, ticket_id, e.quantity);
          pool.query(
            'INSERT INTO product_in_ticket(product_id, ticket_id, quantity) values ($1, $2, $3);', // join with ticket!!!
            [e.product_id, ticket_id, e.quantity],
            (error, results) => {
              if (error) {
                // throw new Error('something went wrong');
                console.log(error.message);
              }
            });
        });
        res.status(201).send({
          message: "Product added"
        });
      } catch (err) {
        return res.status(401).send(error.message);
      }
    });
};

const createBord = (req, res) => {
  const table_name = req.body.table_name;
  const x = 0;
  const y = 0;
  console.log('createBord server: ', table_name);
  pool.query(
    "INSERT INTO bord(restaurant_id, x, y, table_name) values  ($1, $2, $3, $4)  RETURNING table_id;",
    [req.restaurant_id, x, y, table_name],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(401).send(error.message);
      }
      res.status(201).send({
        message: "Bord added",
        table_id: results.rows[0].table_id,
        x,
        y,
        table_name
      });
    }
  );
};

const getBords = (req, res) => {
  pool.query("SELECT * FROM BORD WHERE restaurant_id=$1", [req.restaurant_id], (error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({
      results: results.rows
    });
  });
};

const updateBords = (req, res) => {
  const bords = JSON.parse(req.body.bords);
  pool.query(
    "DELETE FROM bord WHERE restaurant_id=$1;", [req.restaurant_id], // add restaurant_id so that you only delete 1 restaurants tables thank you peter cheers!!!!!!!!!!!!!!!
    (error, results) => {
      if (error) return res.status(401).send(error.message);
      bords.forEach(e => {

        pool.query(
          "INSERT INTO bord(x, y, table_name, restaurant_id) values ($1, $2, $3, $4);",
          [e.x, e.y, e.table_name, req.restaurant_id],
          (error, results) => {
            if (error) return console.log(error);
          });
      });
      res.status(201).send({
        message: "Layout changed"
      });
    });
};

const createTicket = (req, res) => {
  const {
    table_id
  } = req.body;

  const {
    user_id
  } = req.cookies;

  pool.query(
    "INSERT INTO ticket(restaurant_id, user_id, table_id) values  ($1, $2, $3)  RETURNING ticket_id;",
    [req.restaurant_id, user_id, table_id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message);
      }
      res.status(201).send({
        message: "Ticket created",
        ticket_id: results.rows[0].ticket_id
      });
    }
  );
};

const login = (req, res) => {
  const {
    username,
    password
  } = req.body;
  pool.query(
    'select password, role, user_id from users where username=$1;',
    [username],
    (error, results) => {
      if (error || results.rows.length === 0) {
        return res.status(401).send({
          error: "user doesn't exist"
        });
      }
      if (results.rows[0].password == password) {
        res.cookie("user_id", results.rows[0].user_id);
        res.cookie("role", results.rows[0].role);

        res.status(201).send({
          message: "login successful"
        });
      } else {
        return res.status(401).send({
          error: "wrong password"
        });
      }
    });
}

const getUsers = (req, res) => {

  pool.query("SELECT * FROM USERS WHERE restaurant_id=$1", [req.restaurant_id], (error, results) => {
    if (error) {
      return res.status(401).send(error.message);
    }
    res.status(201).send({
      results: results.rows
    });
  });
};

module.exports = {
  createRestaurant,
  getRestaurant,
  getProducts,
  createProduct,
  getTickets,
  getTicketsStats,
  getTicketById,
  addProductsToTicket,
  getBords,
  createBord,
  updateBords,
  createTicket,
  createUser,
  login,
  getRestaurantIdAndRole,
  getUsers
};
