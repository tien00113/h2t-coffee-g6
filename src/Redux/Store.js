import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";


const { authReducer } = require("./Auth/auth.reducer");

const rootReducers = combineReducers({
    auth: authReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));