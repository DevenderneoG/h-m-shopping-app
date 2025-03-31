import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://shoping-app-backend-iota.vercel.app/cart"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "https://shoping-app-backend-iota.vercel.app/cart",
        { productId, quantity }
      );
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `https://shoping-app-backend-iota.vercel.app/cart/${cartId}/item/${productId}`
      );
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove from cart");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartId, productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `https://shoping-app-backend-iota.vercel.app/cart/${cartId}/item/${productId}`,
        { quantity }
      );
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update cart item");
    }
  }
);

const initialState = {
  items: [],
  _id: null,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state._id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload.items)
          ? action.payload.items
          : [];
        state._id = action.payload._id || null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
