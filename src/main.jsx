import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/reset.css';
import './assets/css/index.css';
import App from './components/App/App.jsx';
import { BrowserRouter } from "react-router"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
