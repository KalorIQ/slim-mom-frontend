// API Configuration for KalorIQ Backend
// Centralized configuration for all API settings

export const API_CONFIG = {
  // Backend Server Configuration
  BASE_URL: import.meta.env.VITE_API_URL || "https://slim-mom-backend-ckg8.onrender.com",
  API_PREFIX: "/api",
  TIMEOUT: 10000, // 10 seconds
  
  // Authentication Endpoints
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    SEND_MAIL: "/api/auth/send-mail",
  },
  
  // Product Endpoints
  PRODUCTS: {
    ALL_PRODUCTS: "/api/products/allProducts",
    SEARCH_PRODUCTS: "/api/products/searchProducts",
    ADD_PRODUCT: "/api/products/addProduct", // Admin only
    REMOVE_PRODUCT: "/api/products/removeProduct", // Admin only
  },
  
  // User Product Endpoints (Protected)
  USER_PRODUCTS: {
    ADD: "/api/user/products",
    GET: "/api/user/products",
    REMOVE: "/api/user/products", // DELETE with ID
  },
  
  // User Statistics Endpoints (Protected)
  USER_STATS: {
    DAILY_CALORIES: "/api/user/my-daily-calories",
    DAILY_CALORIE_NEEDS: "/api/user/my-daily-calory-needs",
    CALCULATE_CALORIE_NEEDS: "/api/user/daily-calory-needs",
    WEEKLY_CALORIES: "/api/user/weekly-calories",
    WEIGHT_PROGRESS: "/api/user/weight-progress",
    STATS: "/api/user/stats",
    ACTIVITY_STATS: "/api/user/activity-stats",
    WEIGHT_HISTORY: "/api/user/weight-history",
    MACRO_BREAKDOWN: "/api/user/macro-breakdown",
    ACHIEVEMENTS: "/api/user/achievements",
    WEEKLY_CALORIES_DETAILED: "/api/user/weekly-calories-detailed",
    COMPREHENSIVE_STATS: "/api/user/comprehensive-stats",
  },
  
  // User Management Endpoints (Protected)
  USER: {
    UPDATE_INFO: "/api/user/infouser-update",
  },
  
  // Documentation
  DOCS: "/api-docs",
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Request Headers
export const HEADERS = {
  CONTENT_TYPE: "application/json",
  AUTHORIZATION: "Authorization",
  BEARER: "Bearer",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  UNAUTHORIZED: "Authentication failed. Please login again.",
  SERVER_ERROR: "Server error occurred. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  NOT_FOUND: "Requested resource not found.",
  TIMEOUT: "Request timeout. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful",
  REGISTER: "Registration successful",
  LOGOUT: "Logout successful",
  PRODUCT_ADDED: "Product added successfully",
  PRODUCT_REMOVED: "Product removed successfully",
  USER_UPDATED: "User information updated successfully",
  EMAIL_SENT: "Email sent successfully",
  PASSWORD_RESET: "Password reset email sent successfully",
};

// Token Configuration
export const TOKEN_CONFIG = {
  STORAGE_KEY: "accessToken",
  USER_STORAGE_KEY: "user",
  EXPIRY_TIME: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  REFRESH_THRESHOLD: 5 * 60 * 1000, // Refresh 5 minutes before expiry
};

// API Response Structure
export const RESPONSE_STRUCTURE = {
  SUCCESS: {
    status: "number",
    message: "string",
    data: "object",
  },
  ERROR: {
    status: "number",
    message: "string",
    error: "object",
  },
};

// Validation Rules (matching backend)
export const VALIDATION_RULES = {
  EMAIL: {
    REQUIRED: true,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: "Please enter a valid email address",
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    REQUIRED: true,
    MESSAGE: "Password must be at least 6 characters long",
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    REQUIRED: true,
    MESSAGE: "Name must be between 2 and 50 characters",
  },
  WEIGHT: {
    MIN: 30,
    MAX: 300,
    MESSAGE: "Weight must be between 30 and 300 kg",
  },
  HEIGHT: {
    MIN: 100,
    MAX: 250,
    MESSAGE: "Height must be between 100 and 250 cm",
  },
  AGE: {
    MIN: 16,
    MAX: 100,
    MESSAGE: "Age must be between 16 and 100 years",
  },
};

// Blood Type Options (matching backend)
export const BLOOD_TYPES = {
  1: "O(I)",
  2: "A(II)",
  3: "B(III)",
  4: "AB(IV)",
};

// Activity Levels for Calorie Calculation
export const ACTIVITY_LEVELS = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTREMELY_ACTIVE: 1.9,
};

// Default Values
export const DEFAULTS = {
  DAILY_CALORIE_GOAL: 2000,
  WEIGHT_GOAL_RATE: 0.5, // kg per week
  MACRO_RATIOS: {
    CARBS: 0.45,
    PROTEIN: 0.25,
    FAT: 0.30,
  },
};

export default API_CONFIG; 