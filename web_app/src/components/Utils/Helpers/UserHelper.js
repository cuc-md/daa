export const checkUserManageEventsRole = (rolesArray) => {
    return rolesArray.includes("manage_events");
};

export const checkUserManageClubsRole = (rolesArray) => {
    return rolesArray.includes("manage_clubs");
};

export const checkUserManageUsersRole = (rolesArray) => {
    return rolesArray.includes("manage_users");
};
