import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import to 'react-dom/client'
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
