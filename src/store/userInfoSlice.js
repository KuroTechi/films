import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "./utils/createFetchOptions";
import { networkErrorMessage } from "./utils/errors";
const errorMessage =
  "При запросе данных о пользователе произошла ошибка. Статус: ";

export const getUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async function ({ userId }, { rejectWithValue }) {
    try {
      const options = createFetchOptions("GET");
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}`,
        options
      );
      if (!response.ok) {
        throw new Error(`${errorMessage} ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (
        error.message === "Failed to fetch" ||
        error.message.includes("NetworkError")
      ) {
        return rejectWithValue(networkErrorMessage);
      }
      return rejectWithValue(error.message);
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userToken: null,
    userInfo: null,
    status: null,
    error: null,
    isLoading: true,
  },
  reducers: {
    addUserToken(state, action) {
      state.userToken = action.payload.userToken;
    },
    removeUserToken(state) {
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.userInfo = null;
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userInfoSlice.reducer;

export const { addUserToken, removeUserToken } = userInfoSlice.actions;
