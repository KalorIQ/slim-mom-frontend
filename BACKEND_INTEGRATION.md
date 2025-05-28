# KalorIQ Backend Integration Guide

## 🎯 Overview

This document provides a comprehensive guide for integrating the KalorIQ frontend with the backend API. The frontend has been fully configured to work with the backend API documentation provided.

## 🔧 Configuration Changes Made

### 1. API Base URL Updated
- **Before**: `https://slim-mom-backend-ckg8.onrender.com/`
- **After**: `http://localhost:3000`

### 2. Files Modified
- `src/utils/axiosInstance.js` - Updated base URL
- `src/redux/products/productOperation.js` - Updated base URL and added new endpoints
- `src/redux/auth/authOperation.js` - Added forgot password and send mail endpoints
- `src/redux/products/productSlice.js` - Added new state properties and reducers
- `src/redux/auth/authSlice.js` - Added new auth operation reducers

### 3. New Files Created
- `src/utils/apiTest.js` - API testing utilities
- `src/config/api.js` - Centralized API configuration
- `scripts/dev-setup.js` - Development setup script
- `BACKEND_INTEGRATION.md` - This integration guide

## 📡 API Endpoints Configured

### Authentication Endpoints
```javascript
POST /api/auth/register      // User registration
POST /api/auth/login         // User login
POST /api/auth/logout        // User logout
POST /api/auth/refresh       // Token refresh
POST /api/auth/forgot-password // Password reset
POST /api/auth/send-mail     // Send email
```

### Product Endpoints
```javascript
GET  /api/products/allProducts           // Get all products
GET  /api/products/searchProducts        // Search products
POST /api/user/products                  // Add product to diary
GET  /api/user/products                  // Get user products
DELETE /api/user/products/:id            // Remove product
```

### User Statistics Endpoints
```javascript
GET  /api/user/my-daily-calories         // Daily calories consumed
GET  /api/user/my-daily-calory-needs     // Daily calorie needs
POST /api/user/daily-calory-needs        // Calculate calorie needs
GET  /api/user/weekly-calories           // Weekly calories
GET  /api/user/weight-progress           // Weight progress
GET  /api/user/stats                     // General statistics
GET  /api/user/activity-stats            // Activity statistics
GET  /api/user/weight-history            // Weight history
GET  /api/user/macro-breakdown           // Macro nutrients
GET  /api/user/achievements              // User achievements
PATCH /api/user/infouser-update          // Update user info
```

## 🚀 Quick Start

### 1. Start Backend Server
```bash
# In your backend project directory
npm start
# Backend should be running on http://localhost:3000
```

### 2. Verify Backend Connection
```bash
curl http://localhost:3000/
curl http://localhost:3000/api/products/allProducts
```

### 3. Start Frontend
```bash
# In this project directory
npm install
npm run setup    # Optional: Run setup script
npm run dev
```

### 4. Test API Integration
Open browser console and run:
```javascript
import apiTest from './src/utils/apiTest.js';
apiTest.runAllTests();
```

## 🔐 Authentication Flow

### 1. User Registration
```javascript
// Frontend sends
{
  "email": "user@example.com",
  "password": "123456",
  "name": "User Name"
}

// Backend responds
{
  "status": 201,
  "message": "Successfully registered and logged in a user!",
  "data": {
    "accessToken": "jwt_token_here",
    "user": { /* user data */ }
  }
}
```

### 2. Token Management
- Tokens are stored in localStorage
- Automatic refresh on 401 errors
- Token included in Authorization header: `Bearer <token>`

### 3. Protected Requests
```javascript
headers: {
  "Authorization": "Bearer " + accessToken,
  "Content-Type": "application/json"
}
```

## 📊 Data Flow

### 1. Product Search
```
User Input → searchProducts() → GET /api/products/searchProducts
→ Redux Store → UI Update
```

### 2. Add Product to Diary
```
Product Selection → addProduct() → POST /api/user/products
→ Redux Store → Diary Update → Toast Notification
```

### 3. Daily Calorie Tracking
```
Date Selection → getDailyCalories() → GET /api/user/my-daily-calories
→ Redux Store → Chart Update
```

## 🛠️ Development Tools

### API Testing Utility
```javascript
// Test all endpoints
import apiTest from './src/utils/apiTest.js';
apiTest.runAllTests();

// Test specific endpoints
apiTest.testBackendConnection();
apiTest.testProductSearch("apple");
apiTest.testUserRegistration();
apiTest.testUserLogin();
```

### Configuration File
```javascript
// src/config/api.js
import { API_CONFIG } from './src/config/api.js';
console.log(API_CONFIG.BASE_URL); // http://localhost:3000
```

### Setup Script
```bash
npm run setup  # Checks backend, creates .env, validates setup
```

## 🔍 Debugging

### Common Issues

1. **Backend Not Running**
   ```
   Error: Failed to fetch
   Solution: Start backend on http://localhost:3000
   ```

2. **CORS Issues**
   ```
   Error: CORS policy blocked
   Solution: Backend should have CORS enabled for localhost:5173
   ```

3. **Token Expired**
   ```
   Error: 401 Unauthorized
   Solution: Automatic token refresh implemented
   ```

4. **Invalid Endpoints**
   ```
   Error: 404 Not Found
   Solution: Check backend API documentation
   ```

### Debug Commands
```bash
# Check backend status
curl http://localhost:3000/

# Check API documentation
curl http://localhost:3000/api-docs

# Test product search
curl "http://localhost:3000/api/products/searchProducts?title=apple"

# Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/user/my-daily-calory-needs
```

## 📝 Request/Response Examples

### User Registration
```javascript
// Request
POST /api/auth/register
{
  "email": "test@kaloriq.com",
  "password": "123456",
  "name": "Test User"
}

// Response
{
  "status": 201,
  "message": "Successfully registered and logged in a user!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "name": "Test User",
      "email": "test@kaloriq.com",
      "infouser": {
        "currentWeight": null,
        "height": null,
        "age": null,
        "desireWeight": null,
        "bloodType": null,
        "dailyRate": null
      }
    }
  }
}
```

### Product Search
```javascript
// Request
GET /api/products/searchProducts?title=apple

// Response
{
  "message": "Products matching your search",
  "data": [
    {
      "_id": "5d51694902b2373622ff5c00",
      "title": "Apple Golden",
      "weight": 100,
      "calories": 53,
      "categories": "fruits",
      "carbohydrates": 0,
      "protein": 0,
      "fat": 0
    }
  ]
}
```

### Add Product to Diary
```javascript
// Request
POST /api/user/products
{
  "productId": "5d51694902b2373622ff5c00",
  "productWeight": "150",
  "date": "2025-01-27"
}

// Response
{
  "status": 201,
  "message": "Product added successfully",
  "data": { /* product entry data */ }
}
```

## 🔄 State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: { /* user data */ },
    accessToken: "jwt_token",
    isLoggedIn: true,
    isLoading: false,
    error: null
  },
  products: {
    diaryEntries: [],
    searchResults: [],
    allProducts: [],
    dailyCalories: 0,
    dailyCalorieNeeds: 0,
    weeklyCalories: [],
    userStats: { /* statistics */ },
    isLoading: false,
    error: null
  }
}
```

### Action Dispatching
```javascript
// Login user
dispatch(loginUser({ email, password }));

// Search products
dispatch(searchProducts("apple"));

// Add product to diary
dispatch(addProduct({
  productId: "5d51694902b2373622ff5c00",
  productWeight: "150",
  date: "2025-01-27"
}));

// Get daily calories
dispatch(getDailyCalories("2025-01-27"));
```

## 🚨 Error Handling

### Frontend Error Handling
```javascript
// Automatic error handling in Redux
.addCase(loginUser.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  toast.error("Login failed", toastSettings.error);
});

// Manual error handling
try {
  const result = await dispatch(loginUser(credentials)).unwrap();
  // Success handling
} catch (error) {
  // Error handling
  console.error("Login failed:", error);
}
```

### Backend Error Responses
```javascript
// 400 Bad Request
{
  "status": 400,
  "message": "Validation error",
  "error": { /* validation details */ }
}

// 401 Unauthorized
{
  "status": 401,
  "message": "Authentication failed"
}

// 404 Not Found
{
  "status": 404,
  "message": "Resource not found"
}

// 500 Internal Server Error
{
  "status": 500,
  "message": "Something went wrong"
}
```

## ✅ Testing Checklist

- [ ] Backend server running on http://localhost:3000
- [ ] API documentation accessible at http://localhost:3000/api-docs
- [ ] User registration working
- [ ] User login working
- [ ] Token refresh working
- [ ] Product search working
- [ ] Product addition to diary working
- [ ] Daily calorie tracking working
- [ ] User profile update working
- [ ] Error handling working
- [ ] Toast notifications working

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. ✅ Backend connection successful
2. ✅ User can register and login
3. ✅ Products can be searched and added
4. ✅ Daily calories are tracked
5. ✅ User profile can be updated
6. ✅ Charts and statistics display correctly
7. ✅ Error messages are user-friendly
8. ✅ Loading states work properly

## 📞 Support

If you encounter any issues:

1. Check backend server is running
2. Verify API endpoints match documentation
3. Check browser console for errors
4. Use the API testing utility
5. Review this integration guide

---

**Frontend is now fully configured for the KalorIQ backend API!** 🚀 