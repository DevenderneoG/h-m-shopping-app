import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://shoping-app-backend-iota.vercel.app/products");
  return response.data;
});

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await axios.get("https://shoping-app-backend-iota.vercel.app/categories");
  return response.data.categories;
});

export const fetchProductsDetails = createAsyncThunk("products/fetchProductDetails", async (productId) => {
  const response = await axios.get(`https://shoping-app-backend-iota.vercel.app/products/${productId}`);
  return response.data;
});


export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    selectedCategories: [],
    filteredProducts: [],
    status: "idle",
    error: null,
    wishlist: [],
    searchTerm: '',
  },
  reducers: {   
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    
     state.filteredProducts =
        action.payload.length === 0
          ? state.products
          : state.products.filter((product) =>
              action.payload.includes(product.categoryName) 
            );
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.wishlist.some((item) => item._id === product._id)) {
        state.wishlist.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter((item) => item._id !== productId);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload; 
            })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.status = "succeeded";        
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { setSelectedCategories, addToWishlist,
  removeFromWishlist, setSearchTerm } = productSlice.actions;

export default productSlice.reducer;

