import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/auth/authOperation';
import { clearAuthStorage, clearAllStorage, checkStorageState } from '../utils/clearStorage';
import { debugAuthState, forceAuthReset } from '../utils/debugAuth';

const TestPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Test User');
  const [result, setResult] = useState('');

  const handleLogin = async () => {
    try {
      setResult('Logging in...');
      const response = await dispatch(loginUser({ email, password })).unwrap();
      setResult(`✅ Login successful: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ Login failed: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const handleRegister = async () => {
    try {
      setResult('Registering...');
      const response = await dispatch(registerUser({ email, password, name })).unwrap();
      setResult(`✅ Register successful: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ Register failed: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const handleClearAuth = () => {
    clearAuthStorage();
    setResult('🧹 Authentication storage cleared');
  };

  const handleClearAll = () => {
    clearAllStorage();
    setResult('🧹 All storage cleared');
  };

  const handleCheckStorage = () => {
    checkStorageState();
    setResult('📦 Check console for storage state');
  };

  const handleDebugAuth = () => {
    const state = debugAuthState();
    setResult(`🔍 Auth Debug:\n${JSON.stringify(state, null, 2)}`);
  };

  const handleForceReset = () => {
    forceAuthReset();
  };

  const testBackendConnection = async () => {
    try {
      setResult('Testing backend connection...');
      const response = await fetch('https://slim-mom-backend-ckg8.onrender.com/api/products/allProducts');
      if (response.ok) {
        const data = await response.json();
        setResult(`✅ Backend connection successful. Found ${data.length} products`);
      } else {
        setResult(`❌ Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      setResult(`❌ Backend connection failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 API Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Authentication Test</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <button onClick={handleLogin} style={{ marginRight: '10px', padding: '10px' }}>
            🔑 Login
          </button>
          <button onClick={handleRegister} style={{ marginRight: '10px', padding: '10px' }}>
            📝 Register
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Storage Management</h2>
        <button onClick={handleClearAuth} style={{ marginRight: '10px', padding: '10px' }}>
          🧹 Clear Auth Storage
        </button>
        <button onClick={handleClearAll} style={{ marginRight: '10px', padding: '10px' }}>
          🗑️ Clear All Storage
        </button>
        <button onClick={handleCheckStorage} style={{ marginRight: '10px', padding: '10px' }}>
          📦 Check Storage
        </button>
        <button onClick={handleDebugAuth} style={{ marginRight: '10px', padding: '10px' }}>
          🔍 Debug Auth
        </button>
        <button onClick={handleForceReset} style={{ marginRight: '10px', padding: '10px' }}>
          🔄 Force Reset
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Backend Test</h2>
        <button onClick={testBackendConnection} style={{ padding: '10px' }}>
          🌐 Test Backend Connection
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Result</h2>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          {result || 'No results yet...'}
        </pre>
      </div>
    </div>
  );
};

export default TestPage; 