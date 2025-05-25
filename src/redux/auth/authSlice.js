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

// Helper function to safely clear localStorage
const clearLocalStorage = () => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

// Helper function to get initial state from localStorage
const getInitialState = () => {
  const storedToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  
  let user = {
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

  // Safely parse user data from localStorage
  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      const parsedUser = JSON.parse(storedUser);
      // Ensure the parsed user has the correct structure
      if (parsedUser && typeof parsedUser === 'object') {
        user = {
          name: parsedUser.name || null,
          email: parsedUser.email || null,
          infouser: {
            currentWeight: parsedUser.infouser?.currentWeight || null,
            height: parsedUser.infouser?.height || null,
            age: parsedUser.infouser?.age || null,
            desireWeight: parsedUser.infouser?.desireWeight || null,
            bloodType: parsedUser.infouser?.bloodType || null,
            dailyRate: parsedUser.infouser?.dailyRate || null,
            notAllowedProducts: parsedUser.infouser?.notAllowedProducts || null,
            notAllowedProductsAll: parsedUser.infouser?.notAllowedProductsAll || null,
          },
        };
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // Clear invalid data
      localStorage.removeItem("user");
    }
  }
  
  return {
    user,
    accessToken: storedToken && storedToken !== "undefined" ? storedToken : null,
    isLoggedIn: !!(storedToken && storedToken !== "undefined"),
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
      
      // Check if token is valid
      if (storedToken && storedToken !== "undefined" && storedToken !== "null") {
        state.accessToken = storedToken;
        state.isLoggedIn = true;
      }
      
      // Safely parse and restore user data
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        try {
          state.user = JSON.parse(storedUser);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          // Clear invalid data and reset to default
          localStorage.removeItem("user");
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
        }
      }
    },
    // Action to clear auth state
    clearAuthState: (state) => {
      state.user = initialState.user;
      state.accessToken = null;
      state.isLoggedIn = false;
      clearLocalStorage();
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
        // Store in localStorage safely
        try {
          if (action.payload.data.user) {
            localStorage.setItem("user", JSON.stringify(action.payload.data.user));
          }
        } catch (error) {
          console.error("Error storing user data to localStorage:", error);
        }
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
        // Store in localStorage safely
        try {
          if (action.payload.data.user) {
            localStorage.setItem("user", JSON.stringify(action.payload.data.user));
          }
        } catch (error) {
          console.error("Error storing user data to localStorage:", error);
        }
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
        // Clear localStorage safely
        clearLocalStorage();
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
        
        console.log("=== AUTH SLICE UPDATE DEBUG ===");
        console.log("Current state.user:", state.user);
        console.log("Action payload:", action.payload);
        
        // Safely update user info - preserve existing user data
        if (action.payload?.data?.user) {
          // If backend returns complete user object
          state.user = {
            ...state.user,
            ...action.payload.data.user,
            infouser: {
              ...state.user.infouser,
              ...action.payload.data.user.infouser,
            },
          };
        } else if (action.payload?.data) {
          // If backend returns only infouser data
          state.user = {
            ...state.user,
            infouser: {
              ...state.user.infouser,
              ...action.payload.data,
            },
          };
        } else if (action.payload?.user) {
          // Alternative response structure
          state.user = {
            ...state.user,
            ...action.payload.user,
            infouser: {
              ...state.user.infouser,
              ...action.payload.user.infouser,
            },
          };
        }
        
        console.log("Updated state.user:", state.user);
        console.log("=== END AUTH SLICE DEBUG ===");
        
        // Update localStorage safely
        try {
          if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        } catch (error) {
          console.error("Error storing user data to localStorage:", error);
        }
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
        clearLocalStorage();
        toast.error("Failed to refresh token", toastSettings.error);
      });
  },
});

export const { restoreAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer; 