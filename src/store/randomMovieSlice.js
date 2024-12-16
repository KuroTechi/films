import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "./utils/createFetchOptions";
import { createFetchUrl } from "../components/profile/utils";
import { networkErrorMessage } from "./utils/errors";

export const getRandomMovie = createAsyncThunk(
  "randomMovies/getRandomMovie",
  async function ({ averageRating }, { rejectWithValue, dispatch, getState }) {
    const state = getState();
    const visitedMoviesId = new Set(state.randomMovie.visitedMoviesId);
    let fetchTimes = 0;
    try {
      const url = createFetchUrl();
      const options = createFetchOptions("GET");
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `Ошибка при получении данных с сервера: ${response.status}`
        );
      }

      const firstData = await response.json();

      let minPage = 1;
      let maxPage = Math.min(firstData.total_pages || 1, 500);
      let randomMovie = null;

      while (visitedMoviesId.size < firstData.total_results) {
        try {
          fetchTimes += 1;
          console.log(fetchTimes);

          const randomPage =
            Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

          const newUrl = createFetchUrl(randomPage);
          const secondResponse = await fetch(newUrl, options);
          if (!secondResponse.ok) {
            throw new Error(
              `Ошибка при получении данных со случайной страницы ${randomPage}: ${secondResponse.status}`
            );
          }
          const moviesByRandomPage = await secondResponse.json();
          for (const movie of moviesByRandomPage.results) {
            if (
              !visitedMoviesId.has(movie.id) &&
              movie.vote_average >= Number(averageRating)
            ) {
              visitedMoviesId.add(movie.id);
              dispatch(addVisitedMovieId(movie.id));
              randomMovie = movie;
              break;
            }
          }
          if (randomMovie) {
            break;
          }
          if (fetchTimes >= 20) {
            return rejectWithValue("Попробуйте позже, слишком много запросов");
          }
        } catch (innerError) {
          console.error(
            "Произошла ошибка на случайной странице:",
            innerError.message
          );
        }
      }
      return randomMovie;
    } catch (error) {
      if (
        error.message === "Failed to fetch" ||
        error.message.includes("NetworkError")
      ) {
        return rejectWithValue(networkErrorMessage);
      }
      return rejectWithValue("Ошибка в getRandomMovies: ", error.message);
    }
  }
);

const randomMovieSlice = createSlice({
  name: "randomMovie",
  initialState: {
    visitedMoviesId: [],
    filters: {
      averageRating: "",
    },
    movie: null,
    status: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    addVisitedMovieId(state, action) {
      if (!state.visitedMoviesId.includes(action.payload)) {
        state.visitedMoviesId.push(action.payload);
      }
    },
    setAverageRating(state, action) {
      state.filters.averageRating = action.payload.averageRating;
    },
    resetFilters(state) {
      state.filters.averageRating = "";
      state.movie = null;
      state.status = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getRandomMovie.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.isLoading = true;
        state.movie = null;
      })
      .addCase(getRandomMovie.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(getRandomMovie.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export default randomMovieSlice.reducer;

export const { setAverageRating, resetFilters, addVisitedMovieId } =
  randomMovieSlice.actions;
