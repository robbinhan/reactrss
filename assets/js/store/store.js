import { createStore,applyMiddleware } from 'redux';
import userReducer from '../reducers/user';
import logger from 'redux-diff-logger';
import thunkMiddleware from 'redux-thunk';

// // Redux DevTools store enhancers
// import { devTools, persistState } from 'redux-devtools';
// // React components for Redux DevTools
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

let createStoreWithMiddleware = applyMiddleware(
  logger,
  thunkMiddleware
)(createStore);

let userStore = createStoreWithMiddleware(userReducer);

export default userStore;