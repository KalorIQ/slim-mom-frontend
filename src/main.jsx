
import { createRoot } from 'react-dom/client'
import './assets/css/reset.css'
import './assets/css/index.css'
import App from './components/App/App.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
