import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

const loginUser = createAsyncThunk(
  "api/auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("api/auth/login", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const registerUser = createAsyncThunk(
  "api/auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("api/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const logoutUser = createAsyncThunk("api/auth/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  console.log("State:", state);
  const token = state.auth.accessToken;
  console.log("Token:", token);

  try {
    const response = await instance.post(
      "api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const updateUserInfo = createAsyncThunk(
  "api/user/infouser-update",
  async (userInfoData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.patch(
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { loginUser, registerUser, logoutUser, updateUserInfo };
