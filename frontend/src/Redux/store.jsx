import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; 
import userData from './Reducers/userReducer';
import productData from './Reducers/productReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userData,
    product:productData
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

const persistore = persistStore(store);

export { store, persistore };
