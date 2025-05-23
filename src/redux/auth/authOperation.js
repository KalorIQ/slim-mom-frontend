import { createAsyncThunk } from "@reduxjs/toolkit";

// Access token'ı localStorage'a kaydetmek için yardımcı fonksiyon
const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const getAxiosInstance = async () => {
  // Dinamik import ile döngüsel bağımlılık önlenir
  const module = await import("../../utils/axiosİnstance.js");
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
    const token = state.auth.accessToken;
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const updateUserInfo = createAsyncThunk(
  "api/user/infouser-update",
  async (userInfoData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
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
      return response.data;
    } catch (error) {
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

export { loginUser, registerUser, logoutUser, updateUserInfo, refreshToken };
