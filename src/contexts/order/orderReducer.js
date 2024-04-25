const orderReducer = (state, action) => {
    switch (action.type) {
        case "ORDER":
            return {
                ...state,
                order: action.payload
            }
        case "COMPLETED_ORDER": {
            return {
                ...state,
                order: action.payload
            }
        }
        case "CANCELLED_ORDER": {
            return {
                ...state,
                order: action.payload
            }
        }
        default:
            return state;
    }
};

export default orderReducer;