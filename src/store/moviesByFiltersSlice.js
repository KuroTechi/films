import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createFetchOptions } from "./utils/createFetchOptions";
import { networkErrorMessage } from "./utils/errors";

const errorMessage =
  "Запрос фильмов по фильтрам: Произошла ошибка при получении фильмов по фильтрам! Статус:";

export const getMoviesByFilters = createAsyncThunk(
  "moviesByFilters/getMoviesByFilters",
  async function ({ url }, { rejectWithValue }) {
    try {
      const options = createFetchOptions("GET");
      const response = await fetch(url, options);
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
        return rejectWithValue(
          "Запрос фильмов по фильтрам - " + networkErrorMessage
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

const moviesByFiltersSlice = createSlice({
  name: "moviesByFilters",
  initialState: {
    movies: null,
    status: null,
    error: null,
    isLoading: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesByFilters.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getMoviesByFilters.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(getMoviesByFilters.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default moviesByFiltersSlice.reducer;
