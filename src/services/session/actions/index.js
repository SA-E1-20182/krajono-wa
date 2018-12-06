import { LOGIN, LOGOUT } from '../constants/action-types.js';

export function login(user) {
    console.log("login");
    return {
        type: LOGIN,
        payload: {
            user: user
        }
    }
}

export function logout() {
    console.log("logout");
    return {
        type: LOGOUT
    }
}