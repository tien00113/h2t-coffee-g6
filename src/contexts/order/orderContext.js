import { createContext, useReducer } from "react";
import orderReducer from "./orderReducer";
import { API_BASE_URL, api } from "../../config/api";

const orderContext = createContext();

const initialState = {
    order: null,
};

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    const order = async (order) => {
        try {
            const {data} = await api.post(`${API_BASE_URL}/api/order/create`, order);
            console.log("Đã đặt hàng thành công! ", data);
            dispatch({
                type:'ORDER',
                payload: data,
            })
        } catch (error) {
            console.log("Lỗi order ------------", error);
        }
    }

    const values = {
        ...state,
        order,
    };

    return (
        <orderContext.Provider value={values}>
            {children}
        </orderContext.Provider>
    )
};

export default orderContext;
export {OrderProvider};