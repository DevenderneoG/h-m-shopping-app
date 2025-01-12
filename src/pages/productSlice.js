// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
//   const response = await axios.get("https://shoping-app-backend-iota.vercel.app/products");
//   console.log(response.data);
//   return response.data;
// });

// export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
//   const response = await axios.get(`https://shoping-app-backend-iota.vercel.app/categories`);
//   console.log(response.data);
//   return response.data;
// });



// export const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     products: [],
//     categories: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchProducts.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(fetchProducts.fulfilled, (state, action) => {
//       state.status = "succeeded";
//       state.products = action.payload;
//     });
//     builder.addCase(fetchProducts.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.error.message;
//     });  
//     builder.addCase(fetchCategories.pending, (state) => {
//       state.status = "loading";
//     })
//     // builder.addCase(fetchCategories.fulfilled, (state, action) => {
//     //   state.categories = action.payload;
//     //   state.status = "succeeded";
//     // })
//     builder.addCase(fetchCategories.fulfilled, (state, action) => {
//       state.categories = Array.isArray(action.payload) ? action.payload : [];
//       state.status = "succeeded";
//     });
//     builder.addCase(fetchCategories.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.error.message;
//     });
//   }
// });

// export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://shoping-app-backend-iota.vercel.app/products");
  return response.data;
});

// Fetch Categories
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await axios.get("https://shoping-app-backend-iota.vercel.app/categories");
  // console.log(response.data);
  return response.data.categories;
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
  },
  reducers: {   
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    
      // Update filtered products
      state.filteredProducts =
        action.payload.length === 0
          ? state.products
          : state.products.filter((product) =>
              action.payload.includes(product.categoryName) 
            );
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
      });
  },
});

export const { setSelectedCategories } = productSlice.actions;

export default productSlice.reducer;

