import { GET_ALL_ORDER_FAILURE, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS } from "./order.actionTYPE";

const initialState = {
    loading: false,
    error: null,
    orders: [],
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case GET_ALL_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}