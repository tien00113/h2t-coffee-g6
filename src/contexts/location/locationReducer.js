import { createContext } from "react";

const locationContext = createContext();

const initialState = {
    city:null,
    district: null,
    ward: null,
    street: null
}
