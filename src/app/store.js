import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../pages/productSlice";
import cartReducer from "../pages/cartSlice";
import wishlistReducer from "../pages/wishlistSlice";
import addressReducer from "../pages/addressSlice";
import userReducer from "./../components/userSlice";


export default configureStore({
    reducer: {
        product: productSlice.reducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        address: addressReducer,
        user: userReducer,
    },
});
