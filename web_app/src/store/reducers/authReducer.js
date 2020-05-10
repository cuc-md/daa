const initialState = null;

export default function reducer(state = initialState, {type, token}) {
    switch (type) {
        case 'SIGN_IN_USER':
            return token;
        case 'SIGN_OUT_USER':
            return null;
        default:
            return state;
    }
}
