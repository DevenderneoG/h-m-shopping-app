// src/features/wishlist/wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Initialize the wishlist with an empty array
};

const wishlistSlice = createSlice({
  name: "wishlist",  // Name of the slice
  initialState,      // Initial state
  reducers: {
    // Action to add a product to the wishlist
    addToWishlist: (state, action) => {
      const productId = action.payload; // Get productId from the action payload
      // Check if the product already exists in the wishlist
      const exists = state.items.some(item => item.productId === productId);
      if (!exists) {
        state.items.push({ productId });  // Add productId to wishlist if it doesn't already exist
      }
    },
    // Action to remove a product from the wishlist
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
    // Action to set the entire wishlist (useful when fetching from API)
    setWishlist: (state, action) => {
      state.items = action.payload;
    }
  },
});

// Export actions so they can be dispatched in components
export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;

// Export the reducer to be used in the store
export default wishlistSlice.reducer;
