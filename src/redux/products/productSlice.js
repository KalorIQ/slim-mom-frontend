import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  getDiaryEntries,
  getDailyCalories,
  getDailyCalorieNeeds,
  searchProducts,
  getWeeklyCalories,
  getWeightProgress,
  getUserActivityStats,
  getWeightHistory,
  getMacroBreakdown,
  getUserAchievements,
  getUserStats,
  getAllProducts,
  calculateDailyCalorieNeeds,
  getComprehensiveStats,
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
  allProducts: [],
  currentDate: new Date().toISOString().split("T")[0],
  dailyCalories: 0,
  dailyCalorieNeeds: 0,
  calculatedCalorieNeeds: null,
  dailyRate: 0,
  notAllowedFoods: [],
  weeklyCalories: [],
  weightProgress: [],
  userStats: {
    streak: 0,
    daysActive: 0,
    totalEntries: 0,
    bmi: 24.1,
    weightLoss: 0,
    averageDailyCalories: 1850,
  },
  backendUserStats: null,
  activityStats: {
    totalDays: 0,
    consecutiveDays: 0,
    totalCaloriesBurned: 0,
    averageCaloriesPerDay: 0,
    bestStreak: 0,
    currentStreak: 0,
  },
  weightHistory: [],
  macroBreakdown: {
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
  },
  achievements: [],
  detailedWeeklyData: [],
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
        // Only show toast for non-authentication errors
        if (!action.payload?.message?.includes("Authentication failed")) {
          toast.error("Failed to load diary entries", toastSettings.error);
        }
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
        state.dailyCalorieNeeds = action.payload.data?.dailyRate || 0;
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
      })

      // Get Weekly Calories Cases
      .addCase(getWeeklyCalories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeeklyCalories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weeklyCalories = action.payload || [];
      })
      .addCase(getWeeklyCalories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to load weekly calories", toastSettings.error);
      })

      // Get Weight Progress Cases
      .addCase(getWeightProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeightProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weightProgress = action.payload || [];
      })
      .addCase(getWeightProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to load weight progress", toastSettings.error);
      })

      // Get User Activity Stats Cases
      .addCase(getUserActivityStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserActivityStats.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload !== null) {
          state.activityStats = action.payload || {
            totalDays: 0,
            consecutiveDays: 0,
            totalCaloriesBurned: 0,
            averageCaloriesPerDay: 0,
            bestStreak: 0,
            currentStreak: 0,
          };
        }
      })
      .addCase(getUserActivityStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Weight History Cases
      .addCase(getWeightHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeightHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload !== null) {
          state.weightHistory = action.payload || [];
        }
      })
      .addCase(getWeightHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Macro Breakdown Cases
      .addCase(getMacroBreakdown.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMacroBreakdown.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload !== null) {
          state.macroBreakdown = action.payload || {
            carbs: 0,
            protein: 0,
            fat: 0,
            fiber: 0,
          };
        }
      })
      .addCase(getMacroBreakdown.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get User Achievements Cases
      .addCase(getUserAchievements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAchievements.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload !== null) {
          state.achievements = action.payload || [];
        }
      })
      .addCase(getUserAchievements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get User Stats (Backend) Cases
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.backendUserStats = action.payload?.data || null;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Comprehensive Stats Cases
      .addCase(getComprehensiveStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getComprehensiveStats.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          // Update multiple state properties from comprehensive stats
          const data = action.payload.data;
          
          if (data.overview) {
            state.userStats = {
              ...state.userStats,
              daysActive: data.overview.activeDays || 0,
              totalEntries: data.overview.totalEntries || 0,
              currentStreak: data.overview.currentStreak || 0,
            };
          }
          
          if (data.nutrition) {
            state.macroBreakdown = {
              carbs: data.nutrition.averageMacros?.carbs || 0,
              protein: data.nutrition.averageMacros?.protein || 0,
              fat: data.nutrition.averageMacros?.fat || 0,
              fiber: 0,
            };
          }
          
          if (data.health) {
            state.userStats = {
              ...state.userStats,
              bmi: data.health.bmi || 24.1,
              weightLoss: data.health.weightLoss || 0,
            };
          }
          
          if (data.trends) {
            state.weeklyCalories = data.trends.weeklyTrends || [];
          }
        }
      })
      .addCase(getComprehensiveStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get All Products Cases
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload?.data || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to load all products", toastSettings.error);
      })

      // Calculate Daily Calorie Needs Cases
      .addCase(calculateDailyCalorieNeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(calculateDailyCalorieNeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calculatedCalorieNeeds = action.payload?.data || null;
        toast.success("Daily calorie needs calculated successfully", toastSettings.success);
      })
      .addCase(calculateDailyCalorieNeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to calculate daily calorie needs", toastSettings.error);
      });
  },
});

export const { setCurrentDate, clearSearchResults } = productSlice.actions;
export default productSlice.reducer;
