import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { SEARCH_PRODUCT_FAILURE, SEARCH_PRODUCT_QUERY, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "./search.actionTYPE";

export const getProductByName = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_PRODUCT_REQUEST})
    try {
        const { data } = await axios.get(`${API_BASE_URL}/allproduct/search?query=${query}`);
        dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data });
        dispatch({type: SEARCH_PRODUCT_QUERY, payload: query});

    } catch (error) {
        console.log("lỗi tim kiem--------", error)
        dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: error })
    }
}