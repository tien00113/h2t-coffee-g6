import React, { createContext, useEffect, useReducer } from 'react';
import cartReducer from './cartReducer';
import { API_BASE_URL, api } from '../../config/api';

// Cart-Context
const cartContext = createContext();

// Initial State
const initialState = {
    cartUser: null,
    cartGuests: JSON.parse(localStorage.getItem('cart')) || [],
    message: null,
};

// Cart-Provider Component
const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cartGuests));
    }, [state.cartGuests]);

    // Dispatched Actions
    const addItemCartGuest = (item, quantity) => {
        return dispatch({
            type: 'ADD_TO_CART_GUEST',
            payload: { item, quantity }
        });
    };


    const removeItem = (itemId) => {
        return dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { itemId }
        });
    };

    const incrementItem = (itemId) => {
        return dispatch({
            type: 'INCREMENT_ITEM',
            payload: { itemId }
        });
    };

    const decrementItem = (itemId) => {
        return dispatch({
            type: 'DECREMENT_ITEM',
            payload: { itemId }
        });
    };

    //user
    const addItemCartUser = async (request) => {
        try {
            const { data } = await api.put(`${API_BASE_URL}/api/cart/add`, request);
            console.log("Đã thêm sản phẩm vào giỏ hàng", data);
            dispatch({
                type: 'ADD_TO_CART_USER',
                payload: request
            });
        } catch (error) {
            console.log("lỗi add to user cart--------", error);
        }
    };

    const removeItemCartUser = async (itemId) => {
        try {
            const { data } = await api.delete(`${API_BASE_URL}/api/cart/remove/${itemId}`);
            console.log("Đã xóa sản phẩm khỏi giỏ hàng", data);
            dispatch({
                type: 'REMOVE_ITEM_FROM_CART_USER',
                payload: data, itemId
            });
        } catch (error) {
            console.log("lỗi remove item from user cart--------", error);
        }
    }

    const getUserCart = async () =>{
        try {
            const { data } = await api.get(`${API_BASE_URL}/api/cart`);
            console.log("Du lieu user cart: ", data);
            dispatch({ type: 'GET_USER_CART', payload: data });
    
        } catch (error) {
            console.log("lỗi get user cart--------", error)
        }
    }

    const incrementItemCartUser = async(itemId)=>{
        try {
            const { data } = await api.put(`${API_BASE_URL}/api/cart/increment/${itemId}`);
            console.log("Đã cập nhật (thêm) quantity: ", data);
            dispatch({ type: 'INCREMENT_CART_ITEM', payload: data,itemId });
    
        } catch (error) {
            console.log("lỗi increment item user cart--------", error)
        }
    }

    const decrementItemCartUser = async (itemId) =>{
        try {
            const { data } = await api.put(`${API_BASE_URL}/api/cart/decrement/${itemId}`);
            console.log("Đã cập nhật (trừ) quantity: ", data);
            dispatch({ type: 'DECREMENT_CART_ITEM', payload: data,itemId });
    
        } catch (error) {
            console.log("lỗi decrement item user cart--------", error)
        }
    }

    // Context values
    const values = {
        ...state,
        addItemCartUser,
        addItemCartGuest,
        removeItem,
        removeItemCartUser,
        incrementItem,
        incrementItemCartUser,
        decrementItem,
        decrementItemCartUser,
        getUserCart
    };

    return (
        <cartContext.Provider value={values}>
            {children}
        </cartContext.Provider>
    );
};


export default cartContext;
export { CartProvider };