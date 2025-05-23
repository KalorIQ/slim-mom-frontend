import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/authSlice.js';


const persistConfig = {
    key:"auth",
    storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);
export default store;