import store from './Redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';
import { HashnpmRouter } from 'react-router-dom';
import { Provider } from 'react-redux'


ReactDOM.render(
    <HashnpmRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashnpmRouter>, document.getElementById('root'));

