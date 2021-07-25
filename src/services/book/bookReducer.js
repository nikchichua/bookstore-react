import {
    BOOK_FAILURE,
    SAVE_BOOK_REQUEST,
    BOOK_SUCCESS,
    FETCH_BOOK_REQUEST,
    UPDATE_BOOK_REQUEST, DELETE_BOOK_REQUEST
} from "./bookTypes";

const initialState = {
    book: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_BOOK_REQUEST || FETCH_BOOK_REQUEST || UPDATE_BOOK_REQUEST || DELETE_BOOK_REQUEST:
            return {
                ...state
            };
        case BOOK_SUCCESS:
            return {
                book: action.payload,
                error: null
            }
        case BOOK_FAILURE:
            return {
                book: null,
                error: action.payload
            }
        default: return state;
    }
}

export default reducer;