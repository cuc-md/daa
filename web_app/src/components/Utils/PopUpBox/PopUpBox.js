import React from 'react';
import {PopupboxManager} from 'react-popupbox';
import SignIn from '../../Auth/SignIn';
import Registration from '../../Auth/Registration';

export const openSignInPopUpBox = () => {
    let content = (<SignIn/>);
    PopupboxManager.open({content});
};

export const openRegisterPopUpBox = () => {
    let content = (<Registration/>);
    PopupboxManager.open({content})
};
