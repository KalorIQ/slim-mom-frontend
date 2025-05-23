import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  getDiaryEntries,
  getDailyCalories,
  getDailyCalorieNeeds,
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
  currentDate: new Date().toISOString().split("T")[0],
  dailyCalories: 0,
  dailyRate: 0,
  notAllowedFoods: [],
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
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
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
          (entry) => entry._id !== action.payload.productId
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
        state.diaryEntries = action.payload.products || [];
      })
      .addCase(getDiaryEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to load diary entries", toastSettings.error);
      })

      // Get Daily Calories Cases
      .addCase(getDailyCalories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDailyCalories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyCalories = action.payload.totalCalories || 0;
      })
      .addCase(getDailyCalories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Daily Calorie Needs Cases
      .addCase(getDailyCalorieNeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDailyCalorieNeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyRate = action.payload.data?.dailyRate || 0;
        state.notAllowedFoods = action.payload.data?.notAllowedFoods || [];
      })
      .addCase(getDailyCalorieNeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Search Products Cases
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to search products", toastSettings.error);
      });
  },
});

export const { setCurrentDate, clearSearchResults } = productSlice.actions;
export default productSlice.reducer;
