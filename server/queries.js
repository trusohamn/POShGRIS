const fs = require('fs');
const { Pool } = require('pg');
const connectionSettings = process.env.NODE_ENV === 'production' ?
  {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
  :
  {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432
  }
const pool = new Pool(connectionSettings);

const createRestaurant = (req, res) => {
  const { restaurant_name } = req.body

  pool.query('INSERT INTO restaurant(restaurant_name) values ($1);', [restaurant_name], (error, results) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    res.status(201).send({message: 'Restaurant added'})
  })
}

const getProducts = (req, res) => {
  pool.query('SELECT * FROM PRODUCT', (error, results) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    res.status(201).send({results: results.rows})
  })
}

module.exports = {
  createRestaurant,
  getProducts
}