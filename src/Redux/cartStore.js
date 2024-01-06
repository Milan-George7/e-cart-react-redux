import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slices/productSlice";
import wishlistSlice from "./Slices/wishlistSlice";
import cartSlice from "./Slices/cartSlice";

const cartStore = configureStore({
    reducer:{
        productSlice,
        wishlistSlice,
        cartReducer:cartSlice
    }
})

export default cartStore