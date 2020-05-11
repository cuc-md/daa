import {PopupboxManager} from 'react-popupbox';
import toaster from 'toasted-notes';
import '../../components/Utils/Toaster/Toaster.css';

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
                if (data === undefined || data === null) {
                    toaster.notify("Error sign in",
                        {duration: 3000, position: "bottom"});
                } else {
                    localStorage.setItem("token", data);
                    dispatch({
                        type: 'SIGN_IN_USER',
                        token: data
                    });
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
            .then(response => response.headers.get('authorization'))
            .then(data => {
                if (data === undefined || data === null) {
                    toaster.notify("Error sign in",
                        {duration: 3000, position: "bottom"});
                } else {
                    localStorage.setItem("token", data);
                    dispatch({
                        type: 'SIGN_IN_USER',
                        token: data
                    });
                    PopupboxManager.close();
                }
            })
    }
};

export const signOutUser = () => ({
    type: 'SIGN_OUT_USER'
});
