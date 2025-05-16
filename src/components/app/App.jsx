import HomePage from '../../pages/HomePage/HomePage.jsx';
import Footer from '../Footer/Footer.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import './App.css';
import { Route, Routes } from 'react-router';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import RegisterPage from '../../pages/RegisterPage/RegisterPage.jsx';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;