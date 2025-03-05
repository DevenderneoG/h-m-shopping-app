// // // src/pages/wishlistSlice.js

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // export const fetchWishlist = createAsyncThunk(
// //   "wishlist/fetchWishlist",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(
// //         "https://shoping-app-backend-iota.vercel.app/wishlist"
// //       );
// //       console.log("Fetched wishlist:", response.data);
// //       // Extract the items array, default to [] if not present
// //       const wishlistData = Array.isArray(response.data.items) ? response.data.items : [];
// //       return wishlistData;
// //     } catch (error) {
// //       const errorMessage =
// //         error.response?.data?.error || error.message || "Failed to fetch wishlist";
// //       console.error("Fetch wishlist error:", errorMessage);
// //       return rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // export const addWishList = createAsyncThunk(
// //   "wishlist/addWishlistAsync",
// //   async ({ productId }, { rejectWithValue, dispatch }) => { // Removed updateWishlist for simplicity
// //     try {
// //       const response = await axios.post(
// //         "https://shoping-app-backend-iota.vercel.app/wishlist",
// //         { productId }
// //       );
// //       console.log("Added to wishlist:", response.data);
// //       // After adding, refetch the full wishlist to ensure sync
// //       dispatch(fetchWishlist());
// //       return response.data; // Backend might return the new item or full wishlist
// //     } catch (error) {
// //       const errorMessage =
// //         error.response?.data?.error || error.message || "Failed to add to wishlist";
// //       console.error("Add wishlist error:", errorMessage, error.response?.status);
// //       return rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // const initialState = {
// //   items: [],
// //   status: "idle",
// //   error: null,
// // };

// // const wishlistSlice = createSlice({
// //   name: "wishlist",
// //   initialState,
// //   reducers: {
// //     addToWishlist: (state, action) => {
// //       const productId = action.payload;
// //       const exists = state.items.some((item) => item.productId._id === productId);
// //       if (!exists) {
// //         state.items.push({ productId: { _id: productId } });
// //       }
// //     },
// //     removeFromWishlist: (state, action) => {
// //       const productId = action.payload;
// //       state.items = state.items.filter((item) => item.productId._id !== productId);
// //     },
// //     setWishlist: (state, action) => {
// //       state.items = Array.isArray(action.payload) ? action.payload : [];
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchWishlist.pending, (state) => {
// //         state.status = "loading";
// //         state.error = null;
// //       })
// //       .addCase(fetchWishlist.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.items = Array.isArray(action.payload) ? action.payload : [];
// //       })
// //       .addCase(fetchWishlist.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })
// //       .addCase(addWishList.pending, (state) => {
// //         state.status = "loading";
// //         state.error = null;
// //       })
// //       .addCase(addWishList.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         // Optionally update state optimistically if backend returns the new item
// //         const newItem = action.payload;
// //         if (newItem && newItem.productId && !Array.isArray(newItem)) {
// //           const exists = state.items.some(
// //             (item) => item.productId._id === newItem.productId._id
// //           );
// //           if (!exists) {
// //             state.items.push(newItem);
// //           }
// //         }
// //       })
// //       .addCase(addWishList.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
// // export default wishlistSlice.reducer;

// // src/pages/wishlistSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetchWishlist",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("https://shoping-app-backend-iota.vercel.app/wishlist");
//       return Array.isArray(response.data.items) ? response.data.items : [];
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to fetch wishlist");
//     }
//   }
// );

// export const addWishList = createAsyncThunk(
//   "wishlist/addWishlistAsync",
//   async ({ productId }, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.post("https://shoping-app-backend-iota.vercel.app/wishlist", { productId });
//       dispatch(fetchWishlist());
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to add to wishlist");
//     }
//   }
// );

// export const removeWishList = createAsyncThunk(
//   "wishlist/removeWishlist",
//   async (itemId, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.delete(
//         `https://shoping-app-backend-iota.vercel.app/wishlist/${wishlistId}/item/${productId}` 
//       );
//       dispatch(fetchWishlist()); 
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to remove from wishlist");
//     }
//   }
// );

// const initialState = {
//   items: [],
//   status: "idle",
//   error: null,
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(addWishList.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(addWishList.fulfilled, (state) => {
//         state.status = "succeeded";
//       })
//       .addCase(addWishList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(removeWishList.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(removeWishList.fulfilled, (state) => {
//         state.status = "succeeded";
//       })
//       .addCase(removeWishList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default wishlistSlice.reducer;


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

// export const removeWishList = createAsyncThunk(
//   "wishlist/removeWishlist",
//   async ({ wishlistId, itemId }, { rejectWithValue, dispatch }) => {
//     try {
//       console.log(`Deleting item ${itemId} from wishlist ${wishlistId}`);
//       const response = await axios.delete(
//         `https://shoping-app-backend-iota.vercel.app/wishlist/${wishlistId}/item/${itemId}`
//       );
//       console.log("Delete response:", response.data);
//       // Fetch the updated wishlist after deletion
//       dispatch(fetchWishlist());
//       return itemId;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error || error.message || "Failed to remove from wishlist";
//       console.error("Remove wishlist error:", errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const removeWishList = createAsyncThunk(
  "wishlist/removeWishlist",
  async ({ wishlistId, productId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(`Deleting product ${productId} from wishlist ${wishlistId}`);
      const response = await axios.delete(
        `https://shoping-app-backend-iota.vercel.app/wishlist/${wishlistId}/item/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval logic
          },
        }
      );
      console.log("Delete response:", response.data);
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