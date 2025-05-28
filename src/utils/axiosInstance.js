// src/utils/axiosInstance.js
import axios from "axios";
import store from "../redux/store.js"; // Redux store'un yolunu doğru ver

const axiosInstance = axios.create({
  baseURL: "https://slim-mom-backend-ckg8.onrender.com", // Render backend URL
  withCredentials: true, // Çerezle refresh yapılacaksa şart
});

let isRefreshing = false;

// Request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging
    console.log(`🚀 Making request to: ${config.baseURL}${config.url}`);
    console.log(`🔑 Token present: ${token ? 'Yes' : 'No'}`);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Request successful: ${response.config.url}`);
    return response;
  },
  async (error) => {
    console.log(`❌ Request failed: ${error.config?.url} - Status: ${error.response?.status}`);
    
    const originalRequest = error.config;

    // If we get 401 and it's not a refresh request, clear storage and redirect to login
    if (
      error.response?.status === 401 &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register")
    ) {
      console.log("🚨 Authentication failed - clearing storage and redirecting to login");
      
      // Clear authentication data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:auth");
      localStorage.removeItem("persist:root");
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
