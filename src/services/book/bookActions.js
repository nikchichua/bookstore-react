import {
    SAVE_BOOK_REQUEST,
    BOOK_SUCCESS,
    BOOK_FAILURE,
    UPDATE_BOOK_REQUEST,
    FETCH_BOOK_REQUEST,
    DELETE_BOOK_REQUEST
} from "./bookTypes";
import {BookRequest} from "../httpRequests";
import axios from "axios";

const saveBookRequest = () => ({
    type: SAVE_BOOK_REQUEST
});

export const saveBook = (book, success, failure) => {
    return dispatch => {
        dispatch(saveBookRequest());
        axios.post(BookRequest, book)
            .then(response => {
                dispatch(bookSuccess(response.data));
                success();
            })
            .catch(error => {
                dispatch(bookFailure(error));
                failure(error);
            });
    };
}

const fetchBookRequest = () => ({
    type: FETCH_BOOK_REQUEST
});

export const fetchBook = id => {
    return dispatch => {
        dispatch(fetchBookRequest());
        axios.get(`${BookRequest}/${id}`)
            .then(response => {
                dispatch(bookSuccess(response.data));
            })
            .catch(error => {
                dispatch(bookFailure(error));
            });
    };
}

const updateBookRequest = () => ({
    type: UPDATE_BOOK_REQUEST
});

export const updateBook = (book, success, failure) => {
    return dispatch => {
        dispatch(updateBookRequest());
        axios.put(BookRequest, book)
            .then(response => {
                dispatch(bookSuccess(response.data));
                success();
            })
            .catch(error => {
                dispatch(bookFailure(error));
                failure(error);
            });
    };
}

const deleteBookRequest = () => ({
    type: DELETE_BOOK_REQUEST
});


export const deleteBook = (id, success, failure) => {
    return dispatch => {
        dispatch(deleteBookRequest());
        axios.delete(`${BookRequest}/${id}`)
            .then(response => {
                dispatch(bookSuccess(response.data));
                success();
            })
            .catch(error => {
                dispatch(bookFailure(error));
                failure(error);
            });
    }
}

const bookSuccess = book => ({
    type: BOOK_SUCCESS,
    payload: book
})

const bookFailure = book => ({
    type: BOOK_FAILURE,
    payload: book
});