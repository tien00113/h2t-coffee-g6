import { CLEAR_ERROR, CREATE_ADDRESS, CREATE_ADDRESS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionTYPE";

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                jwt: action.payload,
                loading: false,
                error: null
            }

        case LOGOUT_SUCCESS:
            return { ...state, jwt: null, user: null, loading: false, error: null }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload, error: null, loading: false
            }

        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                user:{
                    ...state.user,
                    address: [...state.user.address, action.payload]
                }
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            }

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_USER_FAILURE:
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}