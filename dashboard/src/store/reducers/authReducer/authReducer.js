const authState = {
    user: null,
    isAuth: false,
    errorMessage: null
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, isAuth: true, user: action.payload, errorMessage: null}
        case "USER_LOGOUT":
            return {...state, isAuth: false, user: null}
        case "USER_CHANGE":
            return {...state, user: action.payload}
        case "USER_REGISTER":
            return {...state, isAuth: true, user: action.payload}
        case "GOOGLE_LOGIN":
            return {...state, isAuth: true, user: action.payload}
        case "ERROR":
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}

export default authReducer;