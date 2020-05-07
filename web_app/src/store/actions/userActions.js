export const getUserInfo = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'GET_USER_INFO',
            user: user
        });
    }
};
