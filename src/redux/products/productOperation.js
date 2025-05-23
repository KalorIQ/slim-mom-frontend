import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

// Add product to diary
const addProduct = createAsyncThunk(
  "api/diary/add-product",
  async (productData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.post(
        "api/diary/add-product",
        productData,
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
  "api/diary/remove-product",
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.delete(
        `api/diary/remove-product/${productId}`,
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

// Get diary entries for a specific date
const getDiaryEntries = createAsyncThunk(
  "api/diary/get-entries",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.get(`api/diary/${date}`, {
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

// Search products
const searchProducts = createAsyncThunk(
  "api/products/search",
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    try {
      const response = await instance.get(
        `api/products/search?query=${query}`,
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

export { addProduct, removeProduct, getDiaryEntries, searchProducts };
