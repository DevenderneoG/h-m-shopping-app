import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../pages/productSlice";
import cartReducer from "../pages/cartSlice";
import wishlistReducer from "../pages/wishlistSlice";


export default configureStore({
    reducer: {
        product: productSlice.reducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
});
