import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const inicio = ReactDOM.createRoot(document.getElementById('root'));

inicio.render(    
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);