import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import App from './containers/App';
import './index.css';

import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools((applyMiddleware(thunk))));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
