const initialState = {
    currentUser: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return {...state, user: action.payload};
        case 'SIGN_OUT_USER':
            return {...state, user: {}};
        default:
            return state;
    }
}