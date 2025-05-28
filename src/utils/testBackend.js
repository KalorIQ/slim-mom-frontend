// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products/allProducts');
    console.log('🔍 Backend test response status:', response.status);
    
    if (response.ok) {
      console.log('✅ Backend is running and accessible');
      return true;
    } else {
      console.log('⚠️ Backend responded but with error status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('💡 Make sure the backend server is running on http://localhost:3000');
    return false;
  }
};

// Test authentication endpoint
export const testAuthEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'wrongpassword'
      })
    });
    
    console.log('🔍 Auth endpoint test response status:', response.status);
    
    if (response.status === 400 || response.status === 401) {
      console.log('✅ Auth endpoint is working (expected error for wrong credentials)');
      return true;
    } else {
      console.log('⚠️ Auth endpoint responded with unexpected status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Auth endpoint connection failed:', error.message);
    return false;
  }
}; 