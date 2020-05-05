import {PopupboxManager} from 'react-popupbox';

export const registerFetch = (user) => {
    return dispatch => {
        return fetch("/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message) {
                    // Here you should have logic to handle invalid creation of a user.
                    // This assumes your Rails API will return a JSON object with a key of
                    // 'message' if there is an error with creating the user, i.e. invalid username
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
        return fetch("/users/sign_in", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message) {
                    // Here you should have logic to handle invalid login credentials.
                    // This assumes your Rails API will return a JSON object with a key of
                    // 'message' if there is an error
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
