import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthContextProvider from './context/AuthContext';
import AppContextProvider from './context/AppContext';


ReactDOM.render(
  <AuthContextProvider>
    <AppContextProvider>

      <App />
    </AppContextProvider>

  </AuthContextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
