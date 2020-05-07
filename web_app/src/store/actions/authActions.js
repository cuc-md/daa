import {PopupboxManager} from 'react-popupbox';
import toaster from 'toasted-notes';

export const registerFetch = (user) => {
    return dispatch => {
        return fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    toaster.notify(data.error.details, {duration: 3000, position: "bottom"});
                } else {
                    localStorage.setItem("token", "token");
                    dispatch(signInUser(data.data));
                    PopupboxManager.close();
                }
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
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    toaster.notify(data.error.details, {duration: 3000, position: "bottom"});
                } else {
                    localStorage.setItem("token", "token");
                    dispatch(signInUser(data.data));
                    PopupboxManager.close();
                }
            })
    }
};

const signInUser = (user) => ({
    type: 'SIGN_IN_USER',
    payload: user
});

export const signOutUser = () => ({
    type: 'SIGN_OUT_USER'
});
