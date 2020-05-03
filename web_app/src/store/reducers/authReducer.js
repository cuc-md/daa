const initialState = {
    currentUser: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return {...state, currentUser: action.payload};
        case 'SIGN_OUT_USER':
            return {...state, currentUser: {}};
        default:
            return state;
    }
}