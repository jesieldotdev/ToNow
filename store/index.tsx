import { combineReducers, configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import event from "./event/reducer";
import actions from "./actions";
import getters from "./getters";

export const modules = { getters, actions };

declare global {
  type RootState = ReturnType<typeof store.getState>;
}

const reducer = combineReducers({
  event,
});

const persistConfig = getPersistConfig({
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
  rootReducer: reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

const Store = ({ children }: { children: React.JSX.Element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Store;
