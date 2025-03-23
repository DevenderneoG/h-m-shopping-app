import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Address
export const fetchAddress = createAsyncThunk("address/fetchAddress", async () => {
  const response = await axios.get("https://shoping-app-backend-iota.vercel.app/address");
  return response.data;
});

// Add Address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://shoping-app-backend-iota.vercel.app/address",
        addressData
      );
      return response.data; // Assuming the backend returns the newly created address
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an existing address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://shoping-app-backend-iota.vercel.app/address/${id}`, addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove item from cart
export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `https://shoping-app-backend-iota.vercel.app/address/${id}` 
      );
      dispatch(fetchAddress()); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove from cart");
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // You can add any synchronous reducers here if needed
    // For example:
    // clearAddress: (state) => {
    //   state.address = [];
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add Address Cases
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address.push(action.payload); // Add the new address to the existing list
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Update Address Cases
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.address.findIndex((addr) => addr._id === action.payload._id);
        if (index !== -1) {
          state.address[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update address";
      });
  },
});

// Export actions if you add any reducers
// export const { clearAddress } = addressSlice.actions;

export default addressSlice.reducer;