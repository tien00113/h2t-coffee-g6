import axios from "axios"
import { CREATE_PRODUCT_REQUEST, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "./product.actionTYPE"
import { API_BASE_URL, api } from "../../config/api"

export const getAllProductsAction = (productData) => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST })
    try {
        const { data } = await api.get(`${API_BASE_URL}/api/products`)

        console.log("tất cả sản phẩm", data)
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data})

    } catch (error) {
        console.log("--------", error)
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error })
    }
}