import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "./utils/createFetchOptions";
import { networkErrorMessage } from "./utils/errors";
import { setTokenLocalStorage } from "../components/authorization-registration/action";
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

export const validateUserToken = createAsyncThunk(
  "userInfo/validateUserToken",
  async function ({ token }, { rejectWithValue }) {
    try {
      const authenticationUrl = "https://api.themoviedb.org/3/authentication";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(authenticationUrl, options);
      console.log(response);
      if (response.status === 401) {
        throw new Error("Введён неверный код, проверьте правильность данных.");
      }
      if (!response.ok) {
        throw new Error(
          `Произошла ошибка при проверке кода: ${response.status}, попробуйте позже.`
        );
      }
      if (response.ok) {
        setTokenLocalStorage(token);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);

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
    validateUserToken: {
      result: null,
      status: null,
      error: null,
      isLoading: false,
    },
  },
  reducers: {
    addUserToken(state, action) {
      state.userToken = action.payload.userToken;
    },
    removeUserToken(state) {
      state.userToken = null;
    },
    removeValidateUserTokenError(state) {
      if (state.validateUserToken.error) {
        state.validateUserToken.error = null;
      } else {
        return;
      }
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
      })
      .addCase(validateUserToken.pending, (state, action) => {
        state.validateUserToken.status = "pending";
        state.validateUserToken.error = null;
        state.validateUserToken.isLoading = true;
        state.validateUserToken.result = action.payload;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        state.validateUserToken.status = "resolved";
        state.validateUserToken.error = null;
        state.validateUserToken.isLoading = false;
        state.validateUserToken.result = action.payload;
      })
      .addCase(validateUserToken.rejected, (state, action) => {
        state.validateUserToken.status = "rejected";
        state.validateUserToken.isLoading = false;
        state.validateUserToken.error = action.payload;
      });
  },
});

export default userInfoSlice.reducer;

export const { addUserToken, removeUserToken, removeValidateUserTokenError } =
  userInfoSlice.actions;
