import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectAccessToken } from '../redux/auth/authSelectors';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  
  // Check both Redux state and localStorage for token
  const localToken = localStorage.getItem('accessToken');
  const hasValidAuth = isLoggedIn && (accessToken || localToken);
  
  console.log('🔒 PrivateRoute check:', {
    isLoggedIn,
    hasAccessToken: !!accessToken,
    hasLocalToken: !!localToken,
    hasValidAuth
  });
  
  return hasValidAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute; 