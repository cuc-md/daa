import {PopupboxManager} from 'react-popupbox';

export const registerFetch = (user) => {
    return dispatch => {
        return fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        })
            .then(response => response.headers.get('authorization'))
            .then(data => {
                localStorage.setItem("token", data);
                dispatch(signInUser(data));
                PopupboxManager.close();
            })
    }
};

export const signInFetch = (user) => {
    return dispatch => {
        return fetch('/users/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        })
            .then(response => response.headers.get('authorization'))
            .then(data => {
                localStorage.setItem("token", data);
                dispatch(signInUser(data));
                PopupboxManager.close();
            })
    }
};

const signInUser = (token) => ({
    type: 'SIGN_IN_USER',
    token: token
});

export const signOutUser = () => ({
    type: 'SIGN_OUT_USER'
});
