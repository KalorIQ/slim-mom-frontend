import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserInfo,
  refreshToken,
} from "./authOperation.js";
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
    theme: "dark", // "dark" teması için doğru şekilde ayarlandı
    transition: Bounce, // Geçiş efekti doğru şekilde belirtildi
    position: "top-right", // "top-center" yerine "top-right"
  },
  error: {
    icon: "❌",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark", // "dark" teması için doğru şekilde ayarlandı
    transition: Bounce, // Geçiş efekti doğru şekilde belirtildi
    position: "top-right", // "top-center" yerine "top-right"
  },
};

// Helper function to get initial state from localStorage
const getInitialState = () => {
  const storedToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  
  return {
    user: storedUser ? JSON.parse(storedUser) : {
      name: null,
      email: null,
      infouser: {
        currentWeight: null,
        height: null,
        age: null,
        desireWeight: null,
        bloodType: null,
        dailyRate: null,
        notAllowedProducts: null,
        notAllowedProductsAll: null,
      },
    },
    accessToken: storedToken,
    isLoggedIn: !!storedToken,
    isLoading: false,
    error: null,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to restore auth state from localStorage
    restoreAuthState: (state) => {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      
      if (storedToken && storedUser) {
        state.accessToken = storedToken;
        state.user = JSON.parse(storedUser);
        state.isLoggedIn = true;
      }
    },
    // Action to clear auth state
    clearAuthState: (state) => {
      state.user = initialState.user;
      state.accessToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        toast.success("Login successful", toastSettings.success);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Login failed", toastSettings.error);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        toast.success("Registration successful", toastSettings.success);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Registration failed", toastSettings.error);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {
          name: null,
          email: null,
          infouser: {
            currentWeight: null,
            height: null,
            age: null,
            desireWeight: null,
            bloodType: null,
            dailyRate: null,
            notAllowedProducts: null,
            notAllowedProductsAll: null,
          },
        };
        state.accessToken = null;
        state.isLoggedIn = false;
        // Clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.success("Logout successful", toastSettings.success);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(
          "We couldn't log you out. Please try again!",
          toastSettings.error
        );
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        toast.success("User info updated successfully", toastSettings.success);
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to update user info", toastSettings.error);
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.data.accessToken;
        toast.success("Token refreshed successfully", toastSettings.success);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Clear auth state on refresh failure
        state.user = {
          name: null,
          email: null,
          infouser: {
            currentWeight: null,
            height: null,
            age: null,
            desireWeight: null,
            bloodType: null,
            dailyRate: null,
            notAllowedProducts: null,
            notAllowedProductsAll: null,
          },
        };
        state.accessToken = null;
        state.isLoggedIn = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.error("Failed to refresh token", toastSettings.error);
      });
  },
});

export const { restoreAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer; 