// Clear localStorage and reset authentication state
export const clearAuthStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  localStorage.removeItem('persist:auth');
  localStorage.removeItem('persist:root');
  console.log('🧹 Authentication storage cleared');
};

// Clear all localStorage
export const clearAllStorage = () => {
  localStorage.clear();
  console.log('🧹 All localStorage cleared');
};

// Check current storage state
export const checkStorageState = () => {
  console.log('📦 Current localStorage state:');
  console.log('- accessToken:', localStorage.getItem('accessToken'));
  console.log('- user:', localStorage.getItem('user'));
  console.log('- persist:auth:', localStorage.getItem('persist:auth'));
  console.log('- persist:root:', localStorage.getItem('persist:root'));
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.clearAuthStorage = clearAuthStorage;
  window.clearAllStorage = clearAllStorage;
  window.checkStorageState = checkStorageState;
} 