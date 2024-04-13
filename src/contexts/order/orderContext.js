import { createContext, useReducer } from "react";
import orderReducer from "./orderReducer";
import { API_BASE_URL, api } from "../../config/api";
import axios from "axios";
import { CREATE_ADDRESS } from "../../Redux/Auth/auth.actionTYPE";

const orderContext = createContext();

const initialState = {
    orderData: null,
    topping: null,
    size: null,
    quantity: null,
    orderItem: null,
    order: null,
    shippingAddress: null,
};

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    const createOrderItem = (product, sizeOption, toppingOptions,quantity, userId) =>{
        return dispatch({
            type: 'ADD_ORDER_ITEM',
            payload: {product, sizeOption, toppingOptions, quantity, userId}
        });
    };

    const changeTopping = (data) => {
        return dispatch({
            type: 'CHANGE_TOPPING',
            payload: data,
        });
    };

    const changeSize = (data) => {
        return dispatch({
            type: 'CHANGE_SIZE',
            payload: data,
        });
    };

    const changeQuantity = (data) => {
        return dispatch({
            type: 'CHANGE_QUANTITY',
            payload: data,
        });
    };

    // const createAddress = async(adr) =>{
    //     try {
    //         const {data} = await api.post(`${API_BASE_URL}/api/address/create`, adr);
    //         console.log("đã thêm address vào user", data);
    //         dispatch({
    //             type:CREATE_ADDRESS,
    //             payload:data,
    //         });
    //         console.log("đã dispatch");
    //     } catch (error) {
    //         console.log("Lỗi add address: ", error);
    //     }
    // }
    const order = async (order) => {
        try {
            const {data} = await api.post(`${API_BASE_URL}/api/order/now`, order);
            console.log("Đã đặt hàng thành công! ", data);
            dispatch({
                type:'ORDER_NOW',
                payload: data,
            })
        } catch (error) {
            console.log("Lỗi order now------------", error);
        }
    }

    const values = {
        ...state,
        createOrderItem,
        changeSize,
        changeTopping,
        changeQuantity,
        order,
        // createAddress,
    };

    return (
        <orderContext.Provider value={values}>
            {children}
        </orderContext.Provider>
    )
};

export default orderContext;
export {OrderProvider};