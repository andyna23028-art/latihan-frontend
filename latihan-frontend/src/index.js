import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap untuk styling
import 'bootstrap-icons/font/bootstrap-icons.css'; // Icon Bootstrap
import './index.css'; // CSS custom kamu
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: untuk analisis performa
reportWebVitals();