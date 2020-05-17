export const meFetch = (token) => {
    return dispatch => {
        return fetch('/api/v1/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then(response => response.json())
            .then(data => dispatch({
                type: 'GET_ME_INFO',
                user: data.data.user
            }))
    }
};
