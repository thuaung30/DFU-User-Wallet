import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "../features/account/accountSlice";
import networkUserDataReducer from "../features/networkUserData/networkUserDataSlice";
import counterReducer from "../features/counter/counterSlice";
import eventReducer from "../features/events/eventSlice";
import { api } from "../api/api";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const persistedAccountReducer = persistReducer(persistConfig, accountReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    account: persistedAccountReducer,
    networkUserData: networkUserDataReducer,
    events: eventReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
