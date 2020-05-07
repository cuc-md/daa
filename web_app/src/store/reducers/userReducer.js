const initState = {};

const userReducer = (state = initState, {type, user}) => {
    switch (type) {
        case 'GET_USER_INFO':
            return user;
        default:
            return state;
    }
};

export default userReducer;
