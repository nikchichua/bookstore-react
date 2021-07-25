import {FAILURE, LOGIN_REQUEST, SUCCESS} from "./authTypes";

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        if(email === 'test' && password === 'test') {
            dispatch(success());
        } else {
            dispatch(failure());
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(failure());
    }
}

const loginRequest = () => ({
    type: LOGIN_REQUEST
})

const success = isLoggedIn => ({
    type: SUCCESS,
    payload: true
})

const failure = isLoggedIn => ({
    type: FAILURE,
    payload: false
})