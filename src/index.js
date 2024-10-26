import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure semicolon at the end of this line
import App from './App'; // Ensure semicolon here
import reportWebVitals from './reportWebVitals'; // Ensure semicolon here
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure semicolon here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
