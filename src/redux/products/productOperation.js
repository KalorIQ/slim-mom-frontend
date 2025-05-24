import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

// Add product to diary
const addProduct = createAsyncThunk(
  "api/user/products",
  async (productData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Remove product from diary
const removeProduct = createAsyncThunk(
  "api/user/products/remove",
  async ({ productId, date }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.delete(
        `api/user/products/${productId}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ...response.data, productId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get diary entries for a specific date
const getDiaryEntries = createAsyncThunk(
  "api/user/products/get",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.get(`api/user/products?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get daily calories consumed
const getDailyCalories = createAsyncThunk(
  "api/user/my-daily-calories",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get daily calorie needs
const getDailyCalorieNeeds = createAsyncThunk(
  "api/user/my-daily-calory-needs",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
};
