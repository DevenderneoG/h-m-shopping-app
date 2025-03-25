import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Users
// export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
//   const response = await axios.get("https://shoping-app-backend-iota.vercel.app/customer");
//   const data = await response.json();
//   return data; // Assuming this returns an array of users
// });
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("https://shoping-app-backend-iota.vercel.app/customer"); // Replace with your actual endpoint
  if (!response.ok) throw new Error("Failed to fetch user");
  const data = await response.json();
  console.log("API Response:", data); // Log the response to verify
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = Array.isArray(action.payload) ? action.payload : [action.payload]; // Store the array of users
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer; // Corrected export