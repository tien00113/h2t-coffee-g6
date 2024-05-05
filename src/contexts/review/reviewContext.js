import { createContext, useReducer } from "react";
import reviewReducer from "./reviewReducer";
import { API_BASE_URL, api } from "../../config/api";
import { toast } from "react-toastify";

const reviewContext = createContext();

const initialState = {
    review: [],
}

const ReviewProvider = ({children}) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const reviewProduct = async (review) => {
        try {
            const {data} = await api.put(`${API_BASE_URL}/api/product/review`, review);
            toast.success('Đã đánh giá sản phẩm thành công!')
            dispatch({
                type: "REVIEW_PRODUCT",
                payload: data
            });
        } catch (error) {
            console.log("Lỗi đánh giá -------------------", error);
            toast.error('Lỗi đánh giá, hãy thử lại sau!')
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