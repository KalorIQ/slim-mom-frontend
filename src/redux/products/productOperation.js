import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

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
      const response = await axiosInstance.post(
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
      
      const response = await axiosInstance.delete(deleteUrl, {
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
      const response = await axiosInstance.get(`api/user/products?date=${date}`, {
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
      const response = await axiosInstance.get(
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
      const response = await axiosInstance.get(
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
      const response = await axiosInstance.get(
        `api/products/searchProducts?title=${query}&limit=15`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ========== NEW ENDPOINTS FOR PROFILE PAGE ==========

// Get weight progress data
const getWeightProgress = createAsyncThunk(
  "api/user/weight-progress",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get("api/user/weight-progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Get weight history data
const getWeightHistory = createAsyncThunk(
  "api/user/weight-history",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get("api/user/weight-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Get user statistics
const getUserStats = createAsyncThunk(
  "api/user/stats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get("api/user/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Get user activity statistics
const getUserActivityStats = createAsyncThunk(
  "api/user/activity-stats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get("api/user/activity-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axiosInstance.get("api/user/achievements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Get macro breakdown
const getMacroBreakdown = createAsyncThunk(
  "api/user/macro-breakdown",
  async (period = "7days", thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get(`api/user/macro-breakdown?period=${period}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Get comprehensive statistics
const getComprehensiveStats = createAsyncThunk(
  "api/user/comprehensive-stats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get("api/user/comprehensive-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Get weekly calories (existing function - keeping for compatibility)
const getWeeklyCalories = createAsyncThunk(
  "api/user/weekly-calories",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.get("api/user/weekly-calories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// ========== EXISTING ENDPOINTS ==========

// Get all products (from backend documentation)
const getAllProducts = createAsyncThunk(
  "api/products/allProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("api/products/allProducts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Calculate daily calorie needs (from backend documentation)
const calculateDailyCalorieNeeds = createAsyncThunk(
  "api/user/daily-calory-needs",
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No authentication token found" });
    }

    try {
      const response = await axiosInstance.post("api/user/daily-calory-needs", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

export {
  addProduct,
  removeProduct,
  getDiaryEntries,
  getDailyCalories,
  getDailyCalorieNeeds,
  searchProducts,
  getWeightProgress,
  getUserActivityStats,
  getWeightHistory,
  getMacroBreakdown,
  getUserAchievements,
  getComprehensiveStats,
  getWeeklyCalories,
  getUserStats,
  getAllProducts,
  calculateDailyCalorieNeeds,
}; 