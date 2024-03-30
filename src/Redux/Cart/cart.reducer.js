import { ADD_TO_USER_CART_FAILURE, ADD_TO_USER_CART_REQUEST, ADD_TO_USER_CART_SUCCESS } from "./cart.actionTYPE";

const initialState = {
    error: null,
    loading: false,
    message:null,
    cartUser: [],
}

export const cartUserReducer = (state=initialState, action) =>{
    switch (action.type) {
        case ADD_TO_USER_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ADD_TO_USER_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case ADD_TO_USER_CART_FAILURE:
            return {
                ...state,
                loading:false,
                error: action.payload,
            }
        default:
            return state;
    }
}