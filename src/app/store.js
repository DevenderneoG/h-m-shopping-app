import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../pages/productSlice";
import cartReducer from "../pages/cartSlice";


export default configureStore({
    reducer: {
        product: productSlice.reducer,
        cart: cartReducer,
    },
});
