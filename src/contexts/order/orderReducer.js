const orderReducer = (state, action) => {
    switch (action.type) {
        case "ORDER":
            return {
                ...state,
                order: action.payload
            }
        default:
            return state;
    }
};

export default orderReducer;