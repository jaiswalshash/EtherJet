import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import dataSlice from "./slice/dataSlice";
import tourSlice from "./slice/TourSlice";
import flightSlice from "./slice/flightSlice";

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedData = persistReducer(persistConfig, dataSlice);
const persistedTour = persistReducer(persistConfig, tourSlice);
const persistedFlight = persistReducer(persistConfig, flightSlice);


export const store = configureStore({
    reducer: {
       data : persistedData,
       tour : persistedTour,
       flights: persistedFlight
    },
    middleware: [thunk],
    devTools: true
})

export const persistor = persistStore(store);