import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PersistGate} from 'redux-persist/lib/integration/react';
import storeConfiguration from './store/storeConfigutarion';

const {store, persistor} = storeConfiguration();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <App/>
        </PersistGate>
    </Provider>, document.getElementById('root'));
serviceWorker.register();
