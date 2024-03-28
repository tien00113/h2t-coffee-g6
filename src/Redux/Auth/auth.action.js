import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionTYPE"
import { API_BASE_URL, api } from "../../config/api"


export const loginUserAction = (loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)

        if(data.token){
            localStorage.setItem("jwt",data.token)
            
        }
console.log("đã đăng nhập",data)
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}


export const registerUserAction = (registerData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData.data)

        if(data.token){
            localStorage.setItem("jwt",data.token)
            
        }
console.log("hoàn tất đăng ký-------",data)
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:REGISTER_FAILURE, payload:error})
    }
}

////////////////////////////chưa sửa//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export const getUserAction = (registerData)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`${API_BASE_URL}/auth/signup`,registerData.data)

        if(data.token){
            localStorage.setItem("jwt",data.token)
        }
console.log("hoàn tất đăng ký-------",data)
        dispatch({type:GET_USER_SUCCESS, payload:data.jwt})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:GET_USER_FAILURE, payload:error})
    }
}