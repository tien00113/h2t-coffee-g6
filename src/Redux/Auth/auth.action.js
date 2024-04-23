import axios from "axios"
import { CLEAR_ERROR, CREATE_ADDRESS, CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionTYPE"
import { API_BASE_URL, api } from "../../config/api"

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    localStorage.removeItem("jwt");
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)

        if (data.token) {
            localStorage.setItem("jwt", data.token)
        }
        console.log("đã đăng nhập", data)
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })

    } catch (error) {
        console.log("--------", error)
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }
}


export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data)

        if (data.token) {
            localStorage.setItem("jwt", data.token)

        }
        console.log("hoàn tất đăng ký-------", data)
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })

    } catch (error) {
        console.log("--------", error)
        dispatch({ type: REGISTER_FAILURE, payload: error })
    }
}

export const getUserAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data })

        if (data.token) {
            localStorage.setItem("jwt", data.token)
        }
        dispatch({ type: GET_USER_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi rồi mày--------", error)
        dispatch({ type: GET_USER_FAILURE, payload: error })
    }
}

export const logoutAction = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/auth/logout`);
        console.log("đã đăng xuất thành công");
        dispatch({ type: LOGOUT_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi rồi mày--------", error)
        dispatch({ type: LOGOUT_FAILURE, payload: error })
    }
}

export const createAddressAction = (adr) => async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS });
    try {
        const { data } = await api.post(`${API_BASE_URL}/api/address/create`, adr);
        console.log("đã thêm address vào user", data);
        dispatch({
            type: CREATE_ADDRESS_SUCCESS,
            payload: data,
        });
        console.log("đã dispatch");
    } catch (error) {
        console.log("Lỗi add address: ", error);
        dispatch({type: CREATE_ADDRESS_FAILURE, payload: error});
    }
}

export const clearErrorAction = () => {
    return {
        type: CLEAR_ERROR
    }
}