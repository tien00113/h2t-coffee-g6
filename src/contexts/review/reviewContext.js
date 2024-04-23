import { createContext, useReducer } from "react";
import reviewReducer from "./reviewReducer";
import { API_BASE_URL, api } from "../../config/api";

const reviewContext = createContext();

const initialState = {
    review: [],
}

const ReviewProvider = ({children}) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const reviewProduct = async (review) => {
        try {
            const {data} = await api.put(`${API_BASE_URL}/api/product/review`, review);
            console.log("đã đánh giá sản phẩm: ", data);
            dispatch({
                type: "REVIEW_PRODUCT",
                payload: data
            });
        } catch (error) {
            console.log("Lỗi đánh giá -------------------", error);
        }
    }

    const values = {
        ...state,
        reviewProduct,
    };

    return (
        <reviewContext.Provider value={values}>
            {children}
        </reviewContext.Provider>
    )
};

export default reviewContext;
export {ReviewProvider};