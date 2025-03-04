import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://shoping-app-backend-iota.vercel.app/wishlist"
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch wishlist");
    }
  }
);

export const addWishList = createAsyncThunk(
  "wishlist/addWishlistAsync",
  async ({ productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "https://shoping-app-backend-iota.vercel.app/wishlist",
        { productId }
      );
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
    // Modified to accept an object
    try {
      const response = await axios.delete(
        `https://shoping-app-backend-iota.vercel.app/wishlist/${wishlistId}/item/${productId}`
      );
      dispatch(fetchWishlist()); // Refetch after deletion
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove from wishlist");
    }
  }
);

const initialState = {
  items: [],
  _id: null,
  status: "idle",
  error: null,
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
        state.items = action.payload.items || [];
        state._id = action.payload._id;
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
        // Items will be updated by fetchWishlist
      })
      .addCase(removeWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
