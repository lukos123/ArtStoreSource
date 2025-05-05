import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  auth: boolean;
}

const state: authState = { auth: false };

const authReducer = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    // plus(state, action: PayloadAction<number>) {
    //   state.num += action.payload;
    // },
    authTrue(state) {
      state.auth = true;
    },
    authFalse(state) {
      state.auth = false;
    },
  },
});
export const authActions = authReducer.actions;
export default authReducer;
