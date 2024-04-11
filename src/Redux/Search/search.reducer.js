import { SEARCH_PRODUCT_FAILURE, SEARCH_PRODUCT_QUERY, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "./search.actionTYPE"

const initialState = {
    error: null,
    loading: false,
    resultProducts: [],
    queryValue:"",
}

export const searchReducer = (state=initialState, action) =>{
    switch (action.type) {
        case SEARCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                resultProducts: action.payload
            }
        case SEARCH_PRODUCT_QUERY:
            return {
                ...state,
                loading:false,
                queryValue: action.payload
            }
        case SEARCH_PRODUCT_FAILURE:
            return {
                ...state,
                loading:false,
                error: action.payload,
            }
        default:
            return state;
    }
}