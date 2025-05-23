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

const initialState = {
  user: {
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
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
        state.user = initialState.user;
        state.accessToken = null;
        state.isLoggedIn = false;
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
        toast.error("Failed to refresh token", toastSettings.error);
      })
  },
});

export default authSlice.reducer;
