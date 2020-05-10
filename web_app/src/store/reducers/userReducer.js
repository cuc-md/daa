const initState = {};

const userReducer = (state = initState, {type, user}) => {
    switch (type) {
        case 'GET_ME_INFO':
            return user;
        case 'SIGN_OUT_USER':
            return {};
        default:
            return state;
    }
};

export default userReducer;
