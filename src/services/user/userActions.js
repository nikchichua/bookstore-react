import {FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS} from "./userTypes";
import axios from 'axios';
import {UserGetRequest} from "../httpRequests";

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUserRequest());
        axios.get(UserGetRequest)
            .then(response => {
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message));
            })
    }
}

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    };
}

const fetchUserSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    };
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    };
}