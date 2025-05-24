import HomePage from "../../pages/HomePage/HomePage.jsx";
import Footer from "../Footer/Footer.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import "./App.css";
import { Route, Routes } from "react-router";
import LoginPage from "../../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";
import DiaryPage from "../../pages/DiaryPage/DiaryPage.jsx";
import CalculatorPage from "../../pages/CalculatorPage/CalculatorPage.jsx";
import Background from "../Background/Background.jsx";
import Flowing from "../FlowingMenu/Flowing.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "../../context/ThemeContext";
import "../../styles/theme.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Background />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
          <div className="flowingContainer">
            <Flowing />
          </div>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
