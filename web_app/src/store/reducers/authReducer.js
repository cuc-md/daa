const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return action.payload;
        case 'SIGN_OUT_USER':
            return {};
        default:
            return state;
    }
}
