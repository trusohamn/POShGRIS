import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Products from './components/Products';

function App() {
  return (
      <div className="App">
    <Router>

      <Route path="/signup" component={Form} />
      <Route path="/products" component={Products} />
    </Router>
      </div>
  );
}

export default App;
