import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice";
import authSlice from "./auth/auth-slice";
import chatbotReducer from "@/slice/chatbot-client.slice";

export const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer, auth: authSlice, chatbotClient: chatbotReducer},
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Call refresh token function on every page load
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
