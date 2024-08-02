import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./Product/product.reducer";
import { categoryReducer } from "./Category/category.reducer";
import { searchReducer } from "./Search/search.reducer";
import { orderReducer } from "./Order/order.reducer";


const { authReducer } = require("./Auth/auth.reducer");

const rootReducers = combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    search: searchReducer,
    order: orderReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));