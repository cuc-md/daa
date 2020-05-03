const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return {user: action.payload};
        case 'SIGN_OUT_USER':
            return {user: {}};
        default:
            return state;
    }
}