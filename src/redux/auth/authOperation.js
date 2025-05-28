import { createAsyncThunk } from "@reduxjs/toolkit";

// Access token'ı localStorage'a kaydetmek için yardımcı fonksiyon
const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const getAxiosInstance = async () => {
  // Dinamik import ile döngüsel bağımlılık önlenir
  const module = await import("../../utils/axiosInstance.js");
  return module.default;
};

const loginUser = createAsyncThunk(
  "api/auth/login",
  async (userData, thunkAPI) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post("api/auth/login", userData);
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const registerUser = createAsyncThunk(
  "api/auth/register",
  async (userData, thunkAPI) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post("api/auth/register", userData);
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const logoutUser = createAsyncThunk(
  "api/auth/logout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken || localStorage.getItem("accessToken");
    
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post(
        "api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      // Even if backend logout fails, clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      
      // Don't reject if it's just a network error - user should still be logged out locally
      if (error.code === 'NETWORK_ERROR' || error.response?.status >= 500) {
        return { message: "Logged out locally due to network error" };
      }
      
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const updateUserInfo = createAsyncThunk(
  "api/user/infouser-update",
  async (userInfoData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
    
    console.log("Sending updateUserInfo request:", userInfoData);
    console.log("Using token:", token ? "Token exists" : "No token");
    
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.patch(
        "api/user/infouser-update",
        userInfoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Backend response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("updateUserInfo error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const refreshToken = createAsyncThunk(
  "api/auth/refresh",
  async (_, thunkAPI) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post(
        "api/auth/refresh",
        {},
        { withCredentials: true }
      );
      // Yeni accessToken'ı kaydet
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Forgot password (from backend documentation)
const forgotPassword = createAsyncThunk(
  "api/auth/forgot-password",
  async (emailData, thunkAPI) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post("api/auth/forgot-password", emailData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Send mail (from backend documentation)
const sendMail = createAsyncThunk(
  "api/auth/send-mail",
  async (mailData, thunkAPI) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post("api/auth/send-mail", mailData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export { 
  loginUser, 
  registerUser, 
  logoutUser, 
  updateUserInfo, 
  refreshToken,
  forgotPassword,
  sendMail 
};
