import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { GET_ALL_PRODUCT_FAILURE, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS, GET_PRODUCT_CART_GUEST_FAILURE, GET_PRODUCT_CART_GUEST_REQUEST, GET_PRODUCT_CART_GUEST_SUCCESS, GET_PRODUCT_DETAIL_FAILURE, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS} from "./product.actionTYPE";

export const getAllProductAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/allproduct`);
        console.log("Tat ca san pham", data);
        dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi get all product--------", error)
        dispatch({ type: GET_ALL_PRODUCT_FAILURE, payload: error })
    }
}

export const getProductDetail = (productId) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAIL_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/allproduct/${productId}`, productId);
        console.log("Chi tiết sản phẩm", data);
        dispatch({ type: GET_PRODUCT_DETAIL_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi get product details--------", error)
        dispatch({ type: GET_PRODUCT_DETAIL_FAILURE, payload: error })
    }
}

export const getProductInCartGuest = (productId) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_CART_GUEST_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/allproduct/cart`, productId);
        console.log("tất cả sản phẩm trong cartguest", data);
        dispatch({ type: GET_PRODUCT_CART_GUEST_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi get product cart guest--------", error)
        dispatch({ type: GET_PRODUCT_CART_GUEST_FAILURE, payload: error })
    }
}

