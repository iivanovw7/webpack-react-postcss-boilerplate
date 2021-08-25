/**
 * Module contains application main entry point.
 * @module app
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/css/critical.css';
import '../assets/css/sanitize.css';
import '../assets/css/_main.pcss';

import { ConnectedRouter } from 'connected-react-router';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { runningMode } from './config';
import { App } from './ui/containers/App';
import appHistory from './ui/routes/history';
import configureStore from './ui/store/configureStore';
import { reportWebVitals } from './utils/reportWebVitals';
import * as serviceWorker from './utils/serviceWorker';

const store = configureStore(appHistory);
const MOUNT_NODE = document.getElementById('app');

const render = (): void => {
    ReactDOM.render(
        <StrictMode>
            <Provider store={ store }>
                <ConnectedRouter history={ appHistory }>
                    <App />
                </ConnectedRouter>
            </Provider>
        </StrictMode>,
        MOUNT_NODE
    );
};

render();

if (runningMode === 'production') {
    serviceWorker.register();
}
else {
    serviceWorker.unregister();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
