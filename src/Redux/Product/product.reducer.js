import { GET_ALL_PRODUCT_FAILURE, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS, GET_PRODUCT_CART_GUEST_FAILURE, GET_PRODUCT_CART_GUEST_REQUEST, GET_PRODUCT_CART_GUEST_SUCCESS, GET_PRODUCT_DETAIL_FAILURE, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS, GET_USER_CART_REQUEST, GET_USER_CART_SUCCESS } from "./product.actionTYPE";

const initialState = {
    error: null,
    loading: false,
    products: [],
    product: null,
    cart: [],
    cartGuest: [],
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT_REQUEST:
        case GET_PRODUCT_DETAIL_REQUEST:
        case GET_PRODUCT_CART_GUEST_REQUEST:
        case GET_USER_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload,
            }
        case GET_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload,
            }

        case GET_PRODUCT_CART_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cartGuest: action.payload,
            }
        case GET_USER_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
            }
        case GET_ALL_PRODUCT_FAILURE:
        case GET_PRODUCT_DETAIL_FAILURE:
        case GET_PRODUCT_CART_GUEST_FAILURE:
        case GET_PRODUCT_CART_GUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}