import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  getDiaryEntries,
  searchProducts,
} from "./productOperation.js";
import { toast, Bounce } from "react-toastify";

const toastSettings = {
  success: {
    icon: "✅",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    position: "top-right",
  },
  error: {
    icon: "❌",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    position: "top-right",
  },
};

const initialState = {
  diaryEntries: [],
  searchResults: [],
  currentDate: new Date().toLocaleDateString("en-GB"),
  dailyRate: 2800,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setDailyRate: (state, action) => {
      state.dailyRate = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers(builder) {
    builder
      // Add Product Cases
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaryEntries.push(action.payload.data);
        toast.success("Product added successfully", toastSettings.success);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to add product", toastSettings.error);
      })

      // Remove Product Cases
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaryEntries = state.diaryEntries.filter(
          (entry) => entry.id !== action.payload.data.id
        );
        toast.success("Product removed successfully", toastSettings.success);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to remove product", toastSettings.error);
      })

      // Get Diary Entries Cases
      .addCase(getDiaryEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDiaryEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaryEntries = action.payload.data;
      })
      .addCase(getDiaryEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to load diary entries", toastSettings.error);
      })

      // Search Products Cases
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to search products", toastSettings.error);
      });
  },
});

export const { setCurrentDate, setDailyRate, clearSearchResults } =
  productSlice.actions;
export default productSlice.reducer;
