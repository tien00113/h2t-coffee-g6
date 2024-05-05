
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART_GUEST':
            const existingItem = state.cartGuests.find(cartItem => ((cartItem.product.id === action.payload.item.product.id) && cartItem.sizeOption.id === action.payload.item.sizeOption.id && ((cartItem.toppingOption === null && action.payload.item.toppingOption === null) || cartItem.toppingOption.id === action.payload.item.toppingOption.id)));
            let newCartGuest;
            if (existingItem) {
                newCartGuest = state.cartGuests.map(cartItem =>
                    cartItem.product.id === action.payload.item.product.id
                        ? { ...cartItem, quantity: cartItem.quantity + action.payload.quantity }
                        : cartItem
                );
            } else {
                const newItem = { id: action.payload.item.id, product: action.payload.item.product, quantity: action.payload.quantity, sizeOption: action.payload.item.sizeOption, toppingOption: action.payload.item.toppingOption };
                newCartGuest = [...state.cartGuests, newItem];
            }
            localStorage.setItem('cart', JSON.stringify(newCartGuest));
            return {
                ...state,
                cartGuests: newCartGuest,
            };


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartGuests: state.cartGuests.filter(item => item.id !== action.payload.itemId)
            };

        case 'INCREMENT_ITEM':
            const incrementedCartGuests = state.cartGuests.map(item => {
                if (item.id === action.payload.itemId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(incrementedCartGuests));
            return {
                ...state,
                cartGuests: incrementedCartGuests,
            };

        case 'DECREMENT_ITEM':
            const decrementedCartGuests = state.cartGuests.map(item => {
                if (item.id === action.payload.itemId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            }).filter(item => item.quantity !== 0);
            localStorage.setItem('cart', JSON.stringify(decrementedCartGuests));
            return {
                ...state,
                cartGuests: decrementedCartGuests,
            };

        case 'ADD_TO_CART_USER':
            return {
                ...state,
                message: action.payload,
                cartUser: {
                    ...state.cartUser,
                    cartItems: [action.payload, ...state?.cartUser?.cartItems]
                }
            }

        case 'REMOVE_ITEM_FROM_CART_USER':
            return {
                ...state,
                message: action.payload,
                cartUser: {
                    ...state.cartUser,
                    cartItems: state.cartUser.cartItems.filter(item => item.id !== action.itemId)
                }
            }
        case 'GET_USER_CART':
            return {
                ...state,
                cartUser: action.payload,
            }
        case 'INCREMENT_CART_ITEM':
            return {
                ...state,
                cartUser: {
                    ...state.cartUser,
                    cartItems: state.cartUser.cartItems.map(item =>
                        item.id === action.itemId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    totalPrice: state.cartUser.cartItems.reduce((total, item) =>
                        total + (item?.id === action.itemId ? (item?.product?.price + item?.sizeOption?.price + ((item?.toppingOption !== null) ? item?.toppingOption?.price : 0)) * (item?.quantity + 1) : (item?.product?.price + item?.sizeOption?.price + ((item?.toppingOption !== null) ? item?.toppingOption?.price : 0)) * item?.quantity), 0),
                    totalSalePrice: state.cartUser.cartItems.reduce((total, item) =>
                        total + (item?.id === action.itemId ? (item?.product?.salePrice + item?.sizeOption?.price + ((item?.toppingOption !== null) ? item?.toppingOption?.price : 0)) * (item?.quantity + 1) : (item?.product?.salePrice + item?.sizeOption?.price + ((item?.toppingOption !== null) ? item?.toppingOption?.price : 0)) * item?.quantity), 0),
                }
            };

        case 'DECREMENT_CART_ITEM':
            let downPrice;
            let downSalePrice;
            let newCartItems = state.cartUser.cartItems.map(item => {
                if (item.id === action.itemId) {
                    downPrice = (item.product?.price + item.sizeOption?.price + ((item?.toppingOption !== null) ? item?.toppingOption?.price : 0));
                    downSalePrice = (item.product?.salePrice + item.sizeOption?.price + ((item?.toppingOption !== null) ? item?.toppingOption?.price : 0));
                    return {
                        ...item, quantity: item.quantity - 1
                    };
                }
                return item;
            }).filter(item => item.quantity > 0);

            let newTotalPrice = state.cartUser.totalPrice - downPrice;
            let newTotalSalePrice = state.cartUser.totalSalePrice - downSalePrice;

            return {
                ...state,
                cartUser: {
                    ...state.cartUser,
                    cartItems: newCartItems,
                    totalPrice: newTotalPrice,
                    totalSalePrice: newTotalSalePrice
                }
            };

        default:
            return state;
    }
};

export default cartReducer;