import { combineReducers, configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createPersistStorage from "redux-persist-expo-filesystem"; // ✅ Importação correta do storage
import task from "./task/reducer";
import setting from "./setting/reducer";
import actions from "./actions";
import getters from "./getters";

export const modules = { getters, actions };

// ✅ Use o storage diretamente (sem chamar como função)
const storage = createPersistStorage;

const reducer = combineReducers({
  task,
  setting,
});

// ✅ Configuração do Redux Persist
const persistConfig = {
  key: "root",
  storage, // 🔥 Apenas passe o storage diretamente, sem chamar como função
  blacklist: [], // Se quiser ignorar algum reducer, adicione aqui
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
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

// ✅ Provedor do Redux Persist com PersistGate
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
