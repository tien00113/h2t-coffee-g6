import { API_BASE_URL, api } from "../../config/api"
import { GET_ALL_ORDER_FAILURE, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS } from "./order.actionTYPE"

export const getAllOrderAction = () =>  async (dispatch) => {
    dispatch({type: GET_ALL_ORDER_REQUEST})

    try {
        const {data} = await api.get(`${API_BASE_URL}/api/order/user`);
        dispatch({type: GET_ALL_ORDER_SUCCESS, payload: data})
    } catch (error) {
        console.log("Lỗi get all order-----------", error)
        dispatch({type: GET_ALL_ORDER_FAILURE, payload: error})
    }
} 