import axios from "axios";
import { GET_ALL_CATEGORY_FAILURE, GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS } from "./category.actionTYPE";
import { API_BASE_URL } from "../../config/api";

export const getAllCategoryAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_CATEGORY_REQUEST})
    try {
        const { data } = await axios.get(`${API_BASE_URL}/allproduct/categorys`);
        console.log("tat ca category: ", data);
        dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data })

    } catch (error) {
        console.log("lỗi get all category--------", error)
        dispatch({ type: GET_ALL_CATEGORY_FAILURE, payload: error })
    }
}