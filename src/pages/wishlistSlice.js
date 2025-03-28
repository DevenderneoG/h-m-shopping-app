import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://shoping-app-backend-iota.vercel.app/wishlist");
      return response.data; // Return the full response data
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch wishlist");
    }
  }
);

export const addWishList = createAsyncThunk(
  "wishlist/addWishlistAsync",
  async ({ productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("https://shoping-app-backend-iota.vercel.app/wishlist", { productId });
      dispatch(fetchWishlist());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add to wishlist");
    }
  }
);

export const removeWishList = createAsyncThunk(
  "wishlist/removeWishlist",
  async ({ wishlistId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `https://shoping-app-backend-iota.vercel.app/wishlist/${wishlistId}/item/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval logic
          },
        }
      );
      dispatch(fetchWishlist());
      return productId;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to remove from wishlist";
      console.error("Remove wishlist error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  wishlistId: null, // Add wishlistId to state
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.wishlistId = action.payload._id || null; // Store wishlistId from response
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addWishList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addWishList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeWishList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        const itemId = action.payload;
        state.items = state.items.filter((item) => item._id !== itemId); // Optimistic update
      })
      .addCase(removeWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;