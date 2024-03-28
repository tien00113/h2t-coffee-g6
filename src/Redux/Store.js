import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./Product/product.reducer";


const { authReducer } = require("./Auth/auth.reducer");

const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));