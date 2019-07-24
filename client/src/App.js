import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import './styles/App.css';
import ProductList from './views/ProductList';
import Signup from './views/Signup';
import AllTickets from './views/AllTickets';
import AppContextProvider, {AppContext} from './context/AppContext';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import Ticket from "./components/Ticket";
import Order from "./views/Order";
import RestaurantLayout from "./views/RestaurantLayout";
import Login from "./views/Login"
import Employees from "./views/Employees"
import Analytics from "./views/Analytics"


function App() {

  const auth = useContext(AuthContext);
  const context = useContext(AppContext);

  useEffect(() => {
    auth.checkLogin();
    console.log('app useeffect');
    context.getRestaurantName();

  }, []);

  return (

      <div className="App">
        
        <Router basename={process.env.PUBLIC_URL}>
          <div className="nav-container">


            {auth.loggedIn ?
             auth.role == 'admin' ? 
            <div>
                <div className="logo-container">
              <h3 className="username">{auth.realname}</h3>
              <h2 className="logo"><Link to="/">{context.restaurantName ? context.restaurantName : ''}</Link></h2>
                <button className="logout-btn" onClick={auth.logout}>Logout</button>
                </div>  
              <ul className="nav">
              <li className="nav-links"><Link to="/products">Products</Link></li>
                <li className="nav-links"><Link to="/all-tickets">Tickets</Link></li>
                <li className="nav-links"><Link to="/restaurantlayout">Overview</Link></li>
                <li className="nav-links"><Link to="/employees">Employees</Link></li>
                <li className="nav-links"><Link to="/analytics">Analytics</Link></li>
              </ul>
              </div>
                : 
                <div>
                <div className="logo-container">
              <h3 className="username">{auth.realname}</h3>
              <h2 className="logo"><Link to="/">{context.restaurantName ? context.restaurantName : ''}</Link></h2>
                <button className="logout-btn" onClick={auth.logout}>Logout</button>
                </div>  
              <ul className="nav">
                <li className="nav-links"><Link to="/all-tickets">Tickets</Link></li>
                <li className="nav-links"><Link to="/restaurantlayout">Overview</Link></li>
              </ul>
              </div>
              :
              <ul className="nav">
                <li className="nav-links"><Link to="/login">Login</Link></li>
              </ul>
            }
          </div>

          {auth.loggedIn ?
            <Switch>
              <Route path="/employees" component={Employees} />
              <Route path="/products" component={ProductList} />
              <Route path="/all-tickets" component={AllTickets} />
              <Route path="/ticket/:id" component={Ticket} />
              <Route path="/order" component={Order} />
              <Route path="/restaurantlayout" component={RestaurantLayout} />
              <Route path="/analytics" component={Analytics} />
            </Switch>

            :
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>

          }
        </Router>
      </div>

  );
}

export default App;
