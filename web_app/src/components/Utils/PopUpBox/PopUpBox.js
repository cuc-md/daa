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
import EditTeam from '../../Teams/EditTeam';
import EditEvent from '../../Events/EditEvent';
import EditClub from '../../Clubs/EditClub';
import EditUser from '../../Users/EditUser';
import DeleteUser from '../../Users/DeleteUser';
import AddUserRoles from '../../Users/AddUserRoles';
import RemoveUserRoles from '../../Users/RemoveUserRoles';
import RegisterTeamForEvent from '../../Teams/RegisterTeamForEvent';
import AddResult from '../../Results/AddResult';
import DeleteResult from '../../Results/DeleteResult';

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

export const openEditClubPopUpBox = (clubId, club) => {
    let content = (<EditClub clubId={clubId} club={club}/>);
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

export const openEditEventPopUpBox = (eventId, event) => {
    let content = (<EditEvent eventId={eventId} event={event}/>);
    PopupboxManager.open({content})
};

export const openDeleteEventPopUpBox = (eventId, eventName) => {
    let content = (<DeleteEvent eventId={eventId} eventName={eventName}/>);
    PopupboxManager.open({content})
};

export const openRegisterTeamForEventPopUpBox = (eventId) => {
    let content = (<RegisterTeamForEvent eventId={eventId}/>);
    PopupboxManager.open({content})
};

export const openAddTeamPopUpBox = () => {
    let content = (<AddTeam/>);
    PopupboxManager.open({content})
};

export const openEditTeamPopUpBox = (teamId, team) => {
    let content = (<EditTeam teamId={teamId} team={team}/>);
    PopupboxManager.open({content})
};

export const openDeleteTeamPopUpBox = (teamId, teamName) => {
    let content = (<DeleteTeam teamId={teamId} teamName={teamName}/>);
    PopupboxManager.open({content})
};

export const openEditUserPopUpBox = (userId, user) => {
    let content = (<EditUser userId={userId} user={user}/>);
    PopupboxManager.open({content})
};

export const openDeleteUserPopUpBox = (userId, userName) => {
    let content = (<DeleteUser userId={userId} userName={userName}/>);
    PopupboxManager.open({content})
};

export const openUserAddRolesPopUpBox = (userId, userRoles) => {
    let content = (<AddUserRoles userId={userId} userRoles={userRoles}/>);
    PopupboxManager.open({content})
};

export const openUserRemoveRolesPopUpBox = (userId, userRoles) => {
    let content = (<RemoveUserRoles userId={userId} userRoles={userRoles}/>);
    PopupboxManager.open({content})
};

export const openAddResultPopUpBox = (userId, eventId, eventName) => {
    let content = (<AddResult userId={userId} eventId={eventId} eventName={eventName}/>);
    PopupboxManager.open({content})
};

export const openDeleteResultPopUpBox = (eventId) => {
    let content = (<DeleteResult eventId={eventId}/>);
    PopupboxManager.open({content})
};
