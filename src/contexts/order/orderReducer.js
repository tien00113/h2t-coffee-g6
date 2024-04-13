import { CREATE_ADDRESS } from "../../Redux/Auth/auth.actionTYPE";

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDER_ITEM':
            return {
                ...state,
                orderItem: {
                    "product": action.payload.product,
                    "price": action.payload.quantity*(action.payload.product?.price + action.payload.sizeOption?.price + action.payload.toppingOptions?.price) ,
                    "priceSale": action.payload.quantity*(action.payload.product?.salePrice + action.payload.sizeOption?.price + action.payload.toppingOptions?.price),
                    "quantity": action.payload.quantity,
                    "userId": action.payload.userId,
                    "sizeOption": action.payload.sizeOption,
                    "toppingOptions": [action.payload.toppingOptions],
                },
            }
        case 'CHANGE_SIZE':
            return {
                ...state,
                size: action.payload,
            }
        case 'CHANGE_TOPPING':
            return {
                ...state,
                topping: action.payload,
            }
        case 'CHANGE_QUANTITY':
            return {
                ...state,
                quantity: action.payload,
            }
        case 'ORDER_NOW':
            return {
                ...state,
                order: action.payload,
            }
        // case CREATE_ADDRESS:
        //     return {
        //         ...state,
        //         shippingAddress: action.payload,
        //     }
        default:
            return state;
    }
};

export default orderReducer;