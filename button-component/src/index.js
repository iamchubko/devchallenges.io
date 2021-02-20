import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './Nav';

ReactDOM.render(
    <div id="wrapper">
      <Nav />
      <App />
    </div>,
  document.getElementById('root')
);