import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import dataSlice from "./slice/dataSlice";

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedData = persistReducer(persistConfig, dataSlice);

export const store = configureStore({
    reducer: {
       data : persistedData
    },
    middleware: [thunk],
    devTools: true
})

export const persistor = persistStore(store);