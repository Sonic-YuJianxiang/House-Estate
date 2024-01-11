import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
});

// persistConfig is the configuration object for redux-persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

// persistedReducer is the persisted version of rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// reducer is the function that returns the state
export const store = configureStore({
    // add persistedReducer instead of rootReducer
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);