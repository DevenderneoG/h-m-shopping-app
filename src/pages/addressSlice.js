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
      });
  },
});

// Export actions if you add any reducers
// export const { clearAddress } = addressSlice.actions;

export default addressSlice.reducer;