import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../pages/productSlice";

export default configureStore({
    reducer: {
        product: productSlice.reducer,
    },
});
