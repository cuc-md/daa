import React from 'react';
import {PopupboxManager} from 'react-popupbox';
import SignIn from '../../Auth/SignIn';
import Registration from '../../Auth/Registration';
import SignOut from '../../Auth/SignOut';
import AddClub from '../../Clubs/AddClub';
import AddEvent from '../../Events/AddEvent';
import AddTeam from '../../Teams/AddTeam';
import DeleteTeam from '../../Teams/DeleteTeam';
import DeleteEvent from '../../Events/DeleteEvent';
import DeleteClub from '../../Clubs/DeleteClub';

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

export const openDeleteClubPopUpBox = (clubId, clubName) => {
    let content = (<DeleteClub clubId={clubId} clubName={clubName}/>);
    PopupboxManager.open({content})
};

export const openAddEventPopUpBox = () => {
    let content = (<AddEvent/>);
    PopupboxManager.open({content})
};

export const openDeleteEventPopUpBox = (eventId, eventName) => {
    let content = (<DeleteEvent eventId={eventId} eventName={eventName}/>);
    PopupboxManager.open({content})
};

export const openAddTeamPopUpBox = () => {
    let content = (<AddTeam/>);
    PopupboxManager.open({content})
};

export const openDeleteTeamPopUpBox = (teamId, teamName) => {
    let content = (<DeleteTeam teamId={teamId} teamName={teamName}/>);
    PopupboxManager.open({content})
};
