import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/reset.css";
import "./assets/css/index.css";
import App from "./components/app/App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import PageLoader from "./components/PageLoader/PageLoader.jsx";
import "./utils/clearStorage.js"; // Import storage utilities for debugging
import "./utils/debugAuth.js"; // Import auth debugging utilities

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PageLoader />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
