// API Test Utility for KalorIQ Backend
// This file helps test backend connectivity and endpoints

const API_BASE_URL = "http://localhost:3000";

// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.text();
    console.log("✅ Backend Connection Test:", response.status, data);
    return { success: true, status: response.status, data };
  } catch (error) {
    console.error("❌ Backend Connection Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Test API documentation endpoint
export const testApiDocs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api-docs`);
    console.log("📚 API Docs Test:", response.status);
    return { success: response.ok, status: response.status };
  } catch (error) {
    console.error("❌ API Docs Test Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Test product search endpoint (no auth required)
export const testProductSearch = async (query = "apple") => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/searchProducts?title=${query}`);
    const data = await response.json();
    console.log("🍎 Product Search Test:", response.status, data);
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error("❌ Product Search Test Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Test all products endpoint (no auth required)
export const testAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/allProducts`);
    const data = await response.json();
    console.log("📦 All Products Test:", response.status, data?.data?.length || 0, "products");
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error("❌ All Products Test Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Test user registration
export const testUserRegistration = async (testUser = {
  email: "test@kaloriq.com",
  password: "123456",
  name: "Test User"
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUser),
    });
    const data = await response.json();
    console.log("👤 User Registration Test:", response.status, data);
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error("❌ User Registration Test Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Test user login
export const testUserLogin = async (credentials = {
  email: "test@kaloriq.com",
  password: "123456"
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    console.log("🔐 User Login Test:", response.status, data);
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error("❌ User Login Test Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Test protected endpoint (requires token)
export const testProtectedEndpoint = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/my-daily-calory-needs`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("🔒 Protected Endpoint Test:", response.status, data);
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error("❌ Protected Endpoint Test Failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log("🚀 Starting KalorIQ Backend API Tests...\n");
  
  // Test 1: Backend Connection
  console.log("1️⃣ Testing Backend Connection...");
  await testBackendConnection();
  
  // Test 2: API Documentation
  console.log("\n2️⃣ Testing API Documentation...");
  await testApiDocs();
  
  // Test 3: Product Search
  console.log("\n3️⃣ Testing Product Search...");
  await testProductSearch();
  
  // Test 4: All Products
  console.log("\n4️⃣ Testing All Products...");
  await testAllProducts();
  
  // Test 5: User Registration
  console.log("\n5️⃣ Testing User Registration...");
  const registrationResult = await testUserRegistration();
  
  // Test 6: User Login
  console.log("\n6️⃣ Testing User Login...");
  const loginResult = await testUserLogin();
  
  // Test 7: Protected Endpoint (if login successful)
  if (loginResult.success && loginResult.data?.data?.accessToken) {
    console.log("\n7️⃣ Testing Protected Endpoint...");
    await testProtectedEndpoint(loginResult.data.data.accessToken);
  }
  
  console.log("\n✅ All tests completed! Check console for results.");
};

// Export individual test functions for manual testing
export default {
  testBackendConnection,
  testApiDocs,
  testProductSearch,
  testAllProducts,
  testUserRegistration,
  testUserLogin,
  testProtectedEndpoint,
  runAllTests,
}; 