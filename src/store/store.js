import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice.js";
import productSlice from "../slices/productSlice.js";
import singleProductSlice from "../slices/singleProductSlice.js";
import cartSlice from "../slices/cartSlice.js";

const store = configureStore({
    reducer : {
        user : userSlice,
        products : productSlice,
        singleProduct : singleProductSlice,
        cart : cartSlice
    }
})

export default store;