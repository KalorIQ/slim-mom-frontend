import HomePage from '../../pages/HomePage/HomePage.jsx';
import Footer from '../Footer/Footer.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import './App.css';
import { Route, Routes } from 'react-router';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import RegisterPage from '../../pages/RegisterPage/RegisterPage.jsx';
import Background from '../Background/Background.jsx'
import Flowing from '../FlowingMenu/Flowing.jsx';
import Loader from '../Loader/Loader.jsx';

function App() {

  return (
    <div className="App">
          <Background />
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <div className="flowingContainer">
              <Flowing />
            </div>
          </main>
          <footer className="footer">
            <Footer />
          </footer>
    </div>
  );
}

export default App;