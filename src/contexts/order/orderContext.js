import { createContext, useReducer } from "react";
import orderReducer from "./orderReducer";
import { API_BASE_URL, api } from "../../config/api";
import { toast } from "react-toastify";

const orderContext = createContext();

const initialState = {
    order: null,
};

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    const order = async (order) => {
        try {
            const {data} = await api.post(`${API_BASE_URL}/api/order/create`, order);
            // console.log("Đã đặt hàng thành công! ", data);
            toast.success('Bạn đã đặt hàng thành công!');
            dispatch({
                type:'ORDER',
                payload: data,
            });
            return data;
        } catch (error) {
            console.log("Lỗi order ------------", error);
        }
    }

    const completedOrder = async (orderId) => {
        try {
            const {data} = await api.put(`${API_BASE_URL}/api/order/delivered`, orderId);
            dispatch({
                type: "COMPLETED_ORDER",
                payload: data,
            })
            return data;
        } catch (error) {
            console.log("Lỗi xác nhận nhận đơn: ", error);
        }
    }

    const cancelledOrder = async (orderId) => {
        try {
            const {data} = await api.put(`${API_BASE_URL}/api/order/cancelled`, orderId);
            dispatch({
                type: "CANCELLED_ORDER",
                payload: data,
            })
            return data;
        } catch (error) {
            console.log("Lỗi hủy đơn: ", error);
        }
    }

    const values = {
        ...state,
        order,
        completedOrder,
        cancelledOrder,
    };

    return (
        <orderContext.Provider value={values}>
            {children}
        </orderContext.Provider>
    )
};

export default orderContext;
export {OrderProvider};