const express = require('express'); 
const app = express();
const port = process.env.PORT || 8000; 
const cors = require('cors');
const db = require('./queries');
const cookie_parser = require('cookie-parser');

const corsOption = {
 origin: 'http://localhost:3000',  // switch in production !!!!
 methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
 credentials: true,
 exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));
app.use(express.urlencoded({
  extended:true
}))

app.use(cookie_parser());

app.post('/api/restaurants', db.createRestaurant);
app.post('/api/products', db.createProduct);
app.get('/api/products', db.getProducts);




app.listen(port, () => console.log(`listening on port ${port}`)); 