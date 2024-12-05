import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userToken: null,
  },
  reducers: {
    addUserToken(state, action) {
      state.userToken = action.payload.userToken;
    },
    removeUserToken(state) {
      state.userToken = null;
    },
  },
});

export default userInfoSlice.reducer;

export const { addUserToken, removeUserToken } = userInfoSlice.actions;
