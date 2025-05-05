import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authState } from "./auth";
import userReducer, { userState } from "./user";

export interface RootState {
  authReducer: authState;
  userReducer: userState;
}

const store = configureStore({
  reducer: {
    authReducer: authReducer.reducer,
    userReducer: userReducer.reducer,
  },
});

export default store;
