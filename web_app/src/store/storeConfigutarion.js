import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import asyncDispatchMiddleware from './middleware/asyncDispatchMiddleware';
import thunk from 'redux-thunk';
import logger from './middleware/logger';

function storeConfiguration(initialState = {}) {
    const store = createStore(persistReducer({
            key: "root",
            debug: true,
            storage,
            blacklist: []
        }, rootReducer),
        initialState,
        compose(applyMiddleware(thunk, asyncDispatchMiddleware, logger)));

    const persistor = persistStore(store, null, () => store.getState());
    return {store, persistor};
}

export default storeConfiguration;
