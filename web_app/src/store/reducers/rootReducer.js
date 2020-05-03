import {combineReducers} from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    currentUser: authReducer
});

export default rootReducer;
