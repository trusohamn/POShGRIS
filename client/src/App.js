import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './styles/App.css';
import Signup from './views/Signup';
import ProductList from './views/ProductList';
import AllTickets from './views/AllTickets';
import AppContextProvider from './context/AppContext';
import Ticket from "./components/Ticket";
import Order from "./views/Order";
import RestaurantLayout from "./views/RestaurantLayout";

function App() {
  return (
    <AppContextProvider>

      <div className="App">
    <Router>
        <div className="nav-container">
          <ul className="nav">
            {/* <li className="nav-links"><Link to="/signup">Signup</Link></li> */}
            <li className="nav-links"><Link to="/products">Products</Link></li>
            <li className="nav-links"><Link to="/all-tickets">All Tickets</Link></li>
            <li className="nav-links"><Link to="/order">New Order</Link></li>
            <li className="nav-links"><Link to="/restaurantlayout">Restaurant Overview</Link></li>
          </ul>
        </div>

      <Route path="/signup" component={Signup} />
      <Route path="/products" component={ProductList} />
      <Route path="/all-tickets" component={AllTickets} />
      <Route path="/ticket/:id" component={Ticket} />
      <Route path="/order" component={Order} />
      <Route path="/restaurantlayout" component={RestaurantLayout} />
    </Router>
      </div>
    </AppContextProvider>

  );
}

export default App;
