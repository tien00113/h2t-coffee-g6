import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./Product/product.reducer";
import { cartUserReducer } from "./Cart/cart.reducer";


const { authReducer } = require("./Auth/auth.reducer");

const rootReducers = combineReducers({
    auth: authReducer,
    product: productReducer,
    cartuser: cartUserReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));