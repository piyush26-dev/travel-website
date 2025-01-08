import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import adminAuthSlice from "../features/adminAuth/authSlice";
import activeRouteSlice  from "../features/activeRoute/activeRouteSlice";
// import activeRouteSlice from "../features/activeRoute/activeRouteSlice";

const activeRouteReducer = combineReducers({
  activeRouteSlice
})

const adminReducer = combineReducers({
  adminAuthSlice,
});

const appReducer = combineReducers({
  activeRoute: activeRouteReducer,
  admin: adminReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
    // persistor.purge();  // Purge persisted data as well
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/profileDetails/fulfilled', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['payload.headers'],
      },
    }),
});

export const persistor = persistStore(store);
