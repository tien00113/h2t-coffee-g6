import { GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "./product.actionTYPE"

const initialState = {
    error:null,
    loading:false,
    product:null
}

export const productReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return{
                ...state,
                product: action.payload,
                loading:false,
                error:null
            }

        case GET_ALL_PRODUCTS_FAILURE:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
    
        default:
            return state;
    }
}