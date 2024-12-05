import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "./utils/createFetchOptions";
const errorMessage =
  "Запрос деталей фильма: Произошла ошибка при получении деталей о фильме. Статус: ";

export const getDetails = createAsyncThunk(
  "movieDetails/getDetails",
  async function ({ movieId }, { rejectWithValue }) {
    try {
      const options = createFetchOptions("GET");
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ru`,
        options
      );
      if (!response.ok) {
        throw new Error(`${errorMessage} ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCredits = createAsyncThunk(
  "movieDetails/getCredits",
  async function ({ movieId }, { rejectWithValue }) {
    try {
      const options = createFetchOptions("GET");
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        options
      );
      if (!response.ok) {
        throw new Error(`${errorMessage} ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  details: null,
  credits: null,
  statusDetails: null,
  statusCredits: null,
  error: null,
  isLoadingDetails: true,
  isLoadingCredits: true,
};

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    resetDetails() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state) => {
        state.isLoadingDetails = true;
        state.statusDetails = "pending";
        state.error = null;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.statusDetails = "resolved";
        state.error = null;
        state.details = action.payload;
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.statusDetails = "rejected";
        state.error = action.payload;
      })
      .addCase(getCredits.pending, (state) => {
        state.isLoadingCredits = true;
        state.statusCredits = "pending";
        state.error = null;
      })
      .addCase(getCredits.fulfilled, (state, action) => {
        state.isLoadingCredits = false;
        state.statusCredits = "resolved";
        state.credits = action.payload;
        state.error = null;
      })
      .addCase(getCredits.rejected, (state, action) => {
        state.isLoadingCredits = false;
        state.statusCredits = "rejected";
        state.error = action.payload;
      });
  },
});

export default movieDetailsSlice.reducer;

export const { resetDetails } = movieDetailsSlice.actions;
