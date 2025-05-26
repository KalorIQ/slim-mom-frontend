import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = (import.meta.env.VITE_API_URL || "https://slim-mom-backend-ckg8.onrender.com/").replace(/\/$/, '') + '/';

const instance = axios.create({
  baseURL: BASE_URL,
});

// Helper function to get token from Redux state or localStorage
const getToken = (state) => {
  const reduxToken = state.auth.accessToken;
  const localToken = localStorage.getItem("accessToken");
  
  const finalToken = reduxToken || localToken;
  return finalToken;
};

// Add product to diary
const addProduct = createAsyncThunk(
  "api/user/products",
  async (productData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.post(
        "api/user/products",
        {
          productId: productData.productId,
          productWeight: productData.productWeight,
          date: productData.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Remove product from diary
const removeProduct = createAsyncThunk(
  "api/user/products/remove",
  async ({ productId, date }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const deleteUrl = `api/user/products/${productId}?date=${date}`;
      
      const response = await instance.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return { ...response.data, productId };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get diary entries for a specific date
const getDiaryEntries = createAsyncThunk(
  "api/user/products/get",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get(`api/user/products?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        
        // Force logout in Redux
        thunkAPI.dispatch({ type: 'auth/forceLogout' });
        
        return thunkAPI.rejectWithValue({ 
          message: "Authentication failed - please login again", 
          shouldRefresh: true,
          forceLogout: true
        });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get daily calories consumed
const getDailyCalories = createAsyncThunk(
  "api/user/my-daily-calories",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get(
        `api/user/my-daily-calories?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get daily calorie needs
const getDailyCalorieNeeds = createAsyncThunk(
  "api/user/my-daily-calory-needs",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get(
        `api/user/my-daily-calory-needs?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Search products
const searchProducts = createAsyncThunk(
  "api/products/searchProducts",
  async (query, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/products/searchProducts?title=${query}&limit=15`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ========== NEW ENDPOINTS FOR PROFILE PAGE ==========
// These endpoints will show 404 errors until backend implements them

// Get user activity history and statistics
const getUserActivityStats = createAsyncThunk(
  "api/user/activity-stats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get("api/user/activity-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // 404 errors will be visible in console to help backend developers
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/activity-stats endpoint");
        return null; // Return null to indicate endpoint not available
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get user weight history
const getWeightHistory = createAsyncThunk(
  "api/user/weight-history",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get("api/user/weight-history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // 404 errors will be visible in console to help backend developers
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/weight-history endpoint");
        return null; // Return null to indicate endpoint not available
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get macro nutrients breakdown
const getMacroBreakdown = createAsyncThunk(
  "api/user/macro-breakdown",
  async (period = '7days', thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get(`api/user/macro-breakdown?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // 404 errors will be visible in console to help backend developers
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/macro-breakdown endpoint");
        return null; // Return null to indicate endpoint not available
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get user achievements
const getUserAchievements = createAsyncThunk(
  "api/user/achievements",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get("api/user/achievements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // 404 errors will be visible in console to help backend developers
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/achievements endpoint");
        return null; // Return null to indicate endpoint not available
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get detailed weekly calories with more data
const getDetailedWeeklyCalories = createAsyncThunk(
  "api/user/detailed-weekly-calories",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get("api/user/weekly-calories-detailed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // 404 errors will be visible in console to help backend developers
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/weekly-calories-detailed endpoint");
        return null; // Return null to indicate endpoint not available
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get comprehensive user statistics
const getUserStatsFromBackend = createAsyncThunk(
  "api/user/comprehensive-stats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await instance.get("api/user/comprehensive-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // 404 errors will be visible in console to help backend developers
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/comprehensive-stats endpoint");
        return null; // Return null to indicate endpoint not available
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ========== MISSING FUNCTIONS THAT WERE CAUSING IMPORT ERRORS ==========

// Get weekly calories (simple version for compatibility)
const getWeeklyCalories = createAsyncThunk(
  "api/user/weekly-calories",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      // Try the detailed endpoint first, fallback to simple calculation
      const response = await instance.get("api/user/weekly-calories-detailed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/weekly-calories endpoint");
        // Return mock data for now
        return {
          data: {
            weeks: [
              { weekStart: "2024-01-08", weekEnd: "2024-01-14", weeklyTotal: 12250, weeklyAverage: 1750 },
              { weekStart: "2024-01-01", weekEnd: "2024-01-07", weeklyTotal: 11800, weeklyAverage: 1686 }
            ]
          }
        };
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get weight progress (simple version for compatibility)
const getWeightProgress = createAsyncThunk(
  "api/user/weight-progress",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      // Try the weight history endpoint first
      const response = await instance.get("api/user/weight-history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn("🚨 BACKEND TODO: Implement GET /api/user/weight-progress endpoint");
        // Return mock data for now
        return {
          data: {
            entries: [
              { date: "2024-01-01", weight: 75.5, notes: "Starting weight" },
              { date: "2024-01-08", weight: 74.8, notes: "Good progress" }
            ],
            trend: "losing",
            totalChange: -0.7
          }
        };
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return thunkAPI.rejectWithValue({ message: "Authentication failed", shouldRefresh: true });
      }
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export {
  addProduct,
  removeProduct,
  getDiaryEntries,
  getDailyCalories,
  getDailyCalorieNeeds,
  searchProducts,
  getUserActivityStats,
  getWeightHistory,
  getMacroBreakdown,
  getUserAchievements,
  getDetailedWeeklyCalories,
  getUserStatsFromBackend,
  getWeeklyCalories,
  getWeightProgress,
}; 