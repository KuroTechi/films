import { createFetchOptions } from "./utils/createFetchOptions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { networkErrorMessage } from "./utils/errors";

const DEFAULT_PAGE = 1;
const errorMessage =
  "Запрос фильмов по названию: Произошла ошибка при запросе к серверу! Статус:";

export const getMoviesBySearch = createAsyncThunk(
  "moviesBySearch/getMoviesBySearch",
  async function ({ movieName, page }, { rejectWithValue }) {
    const uriMovieName = encodeURIComponent(movieName);
    try {
      const options = createFetchOptions("GET");
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${uriMovieName}&include_adult=false&language=ru&page=${page}`,
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

const moviesBySearchSlice = createSlice({
  name: "moviesBySearch",
  initialState: {
    paginationPage: DEFAULT_PAGE,
    movieName: "",
    error: null,
    movies: null,
    status: null,
    isLoading: true,
  },
  reducers: {
    setMovieName(state, action) {
      state.movieName = action.payload.movieName;
      state.paginationPage = DEFAULT_PAGE;
    },
    setSearchPaginationPage(state, action) {
      state.paginationPage = action.payload.page;
    },
    resetMoviesBySearch(state) {
      state.paginationPage = DEFAULT_PAGE;
      state.movieName = "";
      state.error = null;
      state.movies = null;
      state.status = null;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesBySearch.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getMoviesBySearch.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(getMoviesBySearch.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default moviesBySearchSlice.reducer;

export const { setMovieName, setSearchPaginationPage, resetMoviesBySearch } =
  moviesBySearchSlice.actions;
