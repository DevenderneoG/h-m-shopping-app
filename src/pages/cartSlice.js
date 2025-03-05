import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://shoping-app-backend-iota.vercel.app/cart" // Adjust endpoint as needed
      );
      console.log("Cart API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "https://shoping-app-backend-iota.vercel.app/cart", // Adjust endpoint as needed
        { productId, quantity }
      );
      dispatch(fetchCart()); // Refetch cart after adding
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add to cart");
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `https://shoping-app-backend-iota.vercel.app/cart/${cartId}/item/${productId}` // Adjust endpoint as needed
      );
      dispatch(fetchCart()); // Refetch cart after removal
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove from cart");
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartId, productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `https://shoping-app-backend-iota.vercel.app/cart/${cartId}/item/${productId}`, // Adjust endpoint as needed
        { quantity }
      );
      dispatch(fetchCart()); // Refetch cart after update
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
    // Optional: Local state update if you need it
    clearCart: (state) => {
      state.items = [];
      state._id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state._id = action.payload._id;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add to Cart
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
      // Remove from Cart
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
      // Update Cart Item
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