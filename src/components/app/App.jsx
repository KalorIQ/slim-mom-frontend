import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { restoreAuthState } from "../../redux/auth/authSlice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "../../context/ThemeContext";
import "../../styles/theme.css";
import "../../i18n/i18n.js";
import "./App.css";
import PageLoader from "../PageLoader/PageLoader.jsx";

// Lazy loaded components
const HomePage = React.lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = React.lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegisterPage = React.lazy(() => import("../../pages/RegisterPage/RegisterPage.jsx"));
const DiaryPage = React.lazy(() => import("../../pages/DiaryPage/DiaryPage.jsx"));
const CalculatorPage = React.lazy(() => import("../../pages/CalculatorPage/CalculatorPage.jsx"));
const ProfilePage = React.lazy(() => import("../../pages/ProfilePage/ProfilePage.jsx"));
const NotFoundPage = React.lazy(() => import("../../pages/NotFoundPage/NotFoundPage.jsx"));

// Lazy loaded layout components
const Footer = React.lazy(() => import("../Footer/Footer.jsx"));
const Navigation = React.lazy(() => import("../Navigation/Navigation.jsx"));
const Background = React.lazy(() => import("../Background/Background.jsx"));
const Flowing = React.lazy(() => import("../FlowingMenu/Flowing.jsx"));

// Lazy loaded route components
const PrivateRoute = React.lazy(() => import("../../router/PrivateRoute.jsx"));
const PublicRoute = React.lazy(() => import("../../router/PublicRoute.jsx"));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Check if current route is 404
  const isNotFoundPage = !['/', '/login', '/register', '/diary', '/calculator', '/profile'].includes(location.pathname);

  // Restore auth state from localStorage on app initialization
  useEffect(() => {
    dispatch(restoreAuthState());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <div className="App">
        <Suspense fallback={<PageLoader />}>
          {!isNotFoundPage && <Background />}
          {!isNotFoundPage && <Navigation />}
          <main className="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute restricted={true}>
                      <LoginPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute restricted={true}>
                      <RegisterPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/diary" 
                  element={
                    <PrivateRoute>
                      <DiaryPage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/calculator" 
                  element={
                    <PrivateRoute>
                      <CalculatorPage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            {!isNotFoundPage && (
              <Suspense fallback={null}>
                <div className="flowingContainer">
                  <Flowing />
                </div>
              </Suspense>
            )}
          </main>
          {!isNotFoundPage && (
            <Suspense fallback={null}>
              <footer className="footer">
                <Footer />
              </footer>
            </Suspense>
          )}
        </Suspense>
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
