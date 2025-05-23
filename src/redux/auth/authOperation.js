import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: BASE_URL,
});

const loginUser = createAsyncThunk('auth/api/login', async (userData, thunkAPI) => {
    try{
        const response = await instance.post('/auth/login', userData);
        return response.data;
    }catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const registerUser = createAsyncThunk('auth/api/register', async (userData, thunkAPI) => {
    try{
        const response = await instance.post('/auth/register', userData);
        return response.data;
    }catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const logoutUser = createAsyncThunk('auth/api/logout', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.user.accesstoken;
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    try{
        const response = await instance.post('/auth/logout', {},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export { loginUser, registerUser, logoutUser };