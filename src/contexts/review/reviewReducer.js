const reviewReducer = (state, action) => {
    switch (action.type) {
        case "REVIEW_PRODUCT":
            return {
                ...state,
                review: action.payload
            }
        default:
            return state;
    }
};

export default reviewReducer;