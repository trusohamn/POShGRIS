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

app.post('/api/login', db.login);

app.use(db.getRestaurantIdAndRole);
app.get('/api/restaurants', db.getRestaurant);

app.get('/api/products', db.getProducts);
app.get('/api/users', db.getUsers);
app.get('/api/tickets', db.getTickets);
app.get('/api/tickets/stats', db.getTicketsStats);
app.get('/api/tickets/:id', db.getTicketById);
app.post('/api/tickets', db.createTicket);
app.post('/api/tickets/:id', db.addProductsToTicket);




app.post('/api/users', db.createUser);

app.post('/api/products', db.createProduct);

app.get('/api/bord', db.getBords);
app.post('/api/bord', db.createBord);
app.put('/api/bord', db.updateBords);




app.listen(port, () => console.log(`listening on port ${port}`)); 