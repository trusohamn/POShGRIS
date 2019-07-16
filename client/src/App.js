import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './styles/App.css';
import Signup from './views/Signup';
import ProductList from './views/ProductList';
import AllTickets from './views/AllTickets';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <AppContextProvider>

      <div className="App">
    <Router>
        <div>
          <ul>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/all-tickets">All Tickets</Link></li>
          </ul>
        </div>

      <Route path="/signup" component={Signup} />
      <Route path="/products" component={ProductList} />
      <Route path="/all-tickets" component={AllTickets} />
    </Router>
      </div>
    </AppContextProvider>

  );
}

export default App;
