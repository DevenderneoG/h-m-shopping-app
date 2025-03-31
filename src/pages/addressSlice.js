import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    const response = await axios.get(
      "https://shoping-app-backend-iota.vercel.app/address"
    );
    return response.data;
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://shoping-app-backend-iota.vercel.app/address",
        addressData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://shoping-app-backend-iota.vercel.app/address/${id}`,
        addressData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
  reducers: {},
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

      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.address.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.address[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update address";
      });
  },
});

export default addressSlice.reducer;
