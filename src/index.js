import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import App from './components/app';
import store from './redux/store'
import './index.css';

render(
<Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>, 
document.querySelector('#app'));
