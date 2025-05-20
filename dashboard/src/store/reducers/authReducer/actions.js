import {jwtDecode} from "jwt-decode";
import http from "../../../http_common";

export const login = (values) => async (dispatch) => {
    const response = await http.post("account/login", values);
    if(response.status !== 200) {
        return dispatch({type: "ERROR"});
    }
    
    const data = response.data;
    const tokens = data.payload;

    localStorage.setItem("rt", tokens.refreshToken);
    return dispatch(jwtLogin(tokens.accessToken));
}

export const jwtLogin = (token) => async (dispatch) => {
    document.cookie = `at=${token}; path=/;`;
    localStorage.setItem("token", token);
    const user = jwtDecode(token);
    delete user.exp;
    delete user.iss;
    delete user.aud;
    return dispatch({type: "USER_LOGIN", payload: user});
}

export function getToken(key) {
    const name = `${key}=`;
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split(';');

    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

export const refreshTokens = () => async (dispatch) => {
    const access = localStorage.getItem("token");
    const refresh = localStorage.getItem("rt");

    if(refresh && access) {
        const response = await http.post("account/refresh", { accessToken: access, refreshToken: refresh });
        if(response.status === 200) {
            const data = response.data;
            const tokens = data.payload;
            localStorage.setItem("rt", tokens.refreshToken);
            return dispatch(jwtLogin(tokens.accessToken));
        } else {
            return dispatch({type: "ERROR"});
        }
    }
}

export const register = (values) => async (dispatch) => {
    const response = await http.post("account/register", values);
    if(response.status !== 200) {
        return dispatch({type: "ERROR"});
    }

    const data = response.data;
    const token = data.payload;
    return dispatch(jwtLogin(token));
}

export const logout = () => {
    localStorage.removeItem("aut");
    return {type: "USER_LOGOUT"};
}

export const googleLogin = (jwtToken) => {
    const payload = jwtDecode(jwtToken);
    const user = {
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        image: payload.picture,
        role: "user"
    }
    localStorage.setItem("user", JSON.stringify(user));
    return {type: "GOOGLE_LOGIN", payload: user};
}