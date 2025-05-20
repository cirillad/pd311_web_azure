import http from "../../../http_common";

export const loadUsers = () => async (dispatch) => {
    const accessToken = localStorage.getItem("token");

    const response = await http.get("user");

    if(response.status === 200) {
        const { data } = response;
        const { payload } = data;
        return dispatch({type: "USERS_LOAD", payload: payload});
    }
    return dispatch({type: "ERROR" });
};

export const createUser = (user) => {
    const localData = localStorage.getItem('users');
    user.id = 1;
    let users = [];
    if(localData) {
        users = JSON.parse(localData);
        user.id = users[users.length-1].id + 1;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return {type: "USER_CREATE", payload: users};
}

export const updateUser = (user) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(u => u.id.toString() === user.id.toString());
    if(index > -1) {
        users[index] = {...user};
    }
    localStorage.setItem('users', JSON.stringify(users));
    return {type: "USER_UPDATE", payload: users};
}

export const deleteUser = (id) => {
    const data = JSON.parse(localStorage.getItem('users'));
    const users = data.filter(u => u.id.toString() !== id.toString());
    localStorage.setItem('users', JSON.stringify(users));
    return {type: "USER_DELETE", payload: users};
}