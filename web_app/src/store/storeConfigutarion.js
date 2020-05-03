import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from './middleware/logger';

function storeConfiguration(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, logger)));
    return {store};
}

export default storeConfiguration;