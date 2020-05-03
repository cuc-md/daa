import React from 'react';
import {PopupboxManager} from 'react-popupbox';
import SignIn from '../../Auth/SignIn';
import Registration from '../../Auth/Registration';
import SignOut from '../../Auth/SignOut';

export const openSignInPopUpBox = () => {
    let content = (<SignIn/>);
    PopupboxManager.open({content});
};

export const openRegisterPopUpBox = () => {
    let content = (<Registration/>);
    PopupboxManager.open({content})
};

export const openSignOutPopUpBox = () => {
    let content = (<SignOut/>);
    PopupboxManager.open({content})
};
