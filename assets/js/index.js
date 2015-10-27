import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/store';

const store = configureStore;
let node = document.getElementById('app');
ReactDOM.render(
      <App store={store} />,
      node);
