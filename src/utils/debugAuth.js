// Debug authentication state
export const debugAuthState = () => {
  console.log('🔍 === AUTH DEBUG INFO ===');
  
  // Check localStorage
  console.log('📦 localStorage:');
  console.log('- accessToken:', localStorage.getItem('accessToken'));
  console.log('- user:', localStorage.getItem('user'));
  console.log('- persist:auth:', localStorage.getItem('persist:auth'));
  console.log('- persist:root:', localStorage.getItem('persist:root'));
  
  // Check Redux store if available
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    console.log('🏪 Redux Store available - check Redux DevTools');
  }
  
  // Check if we're on the right domain
  console.log('🌐 Current URL:', window.location.href);
  
  return {
    accessToken: localStorage.getItem('accessToken'),
    user: localStorage.getItem('user'),
    persistAuth: localStorage.getItem('persist:auth'),
    persistRoot: localStorage.getItem('persist:root')
  };
};

// Force clear all auth data
export const forceAuthReset = () => {
  console.log('🧹 Force clearing all auth data...');
  
  // Clear localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  localStorage.removeItem('persist:auth');
  localStorage.removeItem('persist:root');
  
  // Clear all localStorage if needed
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.includes('auth') || key.includes('persist')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });
  
  console.log('✅ Auth reset complete');
  
  // Reload page to reset Redux state
  window.location.reload();
};

// Test login flow
export const testLoginFlow = async () => {
  console.log('🧪 Testing login flow...');
  
  try {
    // Test backend connection first
    const response = await fetch('https://slim-mom-backend-ckg8.onrender.com/api/products/allProducts');
    if (!response.ok) {
      console.error('❌ Backend not accessible');
      return false;
    }
    
    console.log('✅ Backend accessible');
    
    // Test login endpoint
    const loginResponse = await fetch('https://slim-mom-backend-ckg8.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: '123456'
      })
    });
    
    if (loginResponse.ok) {
      const data = await loginResponse.json();
      console.log('✅ Login endpoint working:', data);
      return true;
    } else {
      console.error('❌ Login failed:', loginResponse.status);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};

// Make functions globally available
if (typeof window !== 'undefined') {
  window.debugAuthState = debugAuthState;
  window.forceAuthReset = forceAuthReset;
  window.testLoginFlow = testLoginFlow;
} 