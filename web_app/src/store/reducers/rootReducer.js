import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    token: authReducer,
    user: userReducer
});

export default rootReducer;
