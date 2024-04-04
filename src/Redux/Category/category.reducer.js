import { GET_ALL_CATEGORY_FAILURE, GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS } from "./category.actionTYPE"

const initialState = {
    error: null,
    loading: false,
    category: [],
}

export const categoryReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload
            }
        case GET_ALL_CATEGORY_FAILURE:
            return {
                ...state,
                loading:false,
                error: action.payload,
            }
        default:
            return state;
    }
}