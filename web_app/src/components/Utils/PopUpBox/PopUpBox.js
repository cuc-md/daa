import React from 'react';
import {PopupboxManager} from 'react-popupbox';
import SignIn from '../../Auth/SignIn';
import Registration from '../../Auth/Registration';
import SignOut from '../../Auth/SignOut';
import AddClub from '../../Clubs/AddClub';
import AddEvent from '../../Events/AddEvent';
import AddTeam from '../../Teams/AddTeam';

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

export const openAddClubPopUpBox = () => {
    let content = (<AddClub/>);
    PopupboxManager.open({content})
};

export const openAddEventPopUpBox = () => {
    let content = (<AddEvent/>);
    PopupboxManager.open({content})
};

export const openAddTeamPopUpBox = () => {
    let content = (<AddTeam/>);
    PopupboxManager.open({content})
};
