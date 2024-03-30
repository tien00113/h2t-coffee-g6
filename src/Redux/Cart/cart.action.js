import { API_BASE_URL, api } from "../../config/api";
import { ADD_TO_USER_CART_FAILURE, ADD_TO_USER_CART_REQUEST, ADD_TO_USER_CART_SUCCESS } from "./cart.actionTYPE";

export const addToUserCartAction = (rq) => async (dispatch) => {
    dispatch({ type: ADD_TO_USER_CART_REQUEST })
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/cart/add`,rq);
        console.log("ĐÃ thêm sản phẩm vào giỏ hàng", data);
        dispatch({ type: ADD_TO_USER_CART_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi add to user cart--------", error)
        dispatch({ type: ADD_TO_USER_CART_FAILURE, payload: error })
    }
}
