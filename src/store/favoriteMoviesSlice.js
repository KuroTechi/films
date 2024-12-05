import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createFetchOptions,
  createFetchPostOptions,
} from "./utils/createFetchOptions";
import { networkErrorMessage } from "./utils/errors";
const errorMessage =
  "Запрос избранных фильмов: Произошла ошибка при получении избранных фильмов! Статус: ";

async function queryFavoriteMovies(page) {
  const options = createFetchOptions("GET");
  const response = await fetch(
    `https://api.themoviedb.org/3/account/20039690/favorite/movies?language=ru&page=${page}`,
    options
  );

  if (!response.ok) {
    throw new Error(`${errorMessage} ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const getFavoriteMovies = createAsyncThunk(
  "favoriteMovies/getFavoriteMovies",
  async function (_, { rejectWithValue }) {
    const startPage = 1;
    let allFavoriteMovies = [];
    try {
      const firstPageData = await queryFavoriteMovies(startPage);

      allFavoriteMovies = [...firstPageData.results];
      const totalPages = firstPageData.total_pages;
      if (totalPages > 1) {
        const requests = [];
        for (let i = 2; i <= totalPages; i++) {
          requests.push(queryFavoriteMovies(i));
        }
        const results = await Promise.all(requests);

        results.forEach((pageData) => {
          allFavoriteMovies = [...allFavoriteMovies, ...pageData.results];
        });
      }
      return allFavoriteMovies;
    } catch (error) {
      if (
        error.message === "Failed to fetch" ||
        error.message.includes("NetworkError")
      ) {
        return rejectWithValue(networkErrorMessage);
      }

      return rejectWithValue(error.message || "Неизвестная ошибка");
    }
  }
);

export const addOrRemoveFavoriteMovieDataBase = createAsyncThunk(
  "favoriteMovies/addFavoriteMovieToDataBase",
  async function ({ movie, action }, { rejectWithValue, dispatch }) {
    const url = "https://api.themoviedb.org/3/account/20039690/favorite";
    dispatch(addOrDeleteFavoriteMovie({ movie: movie, isFavorite: action }));
    try {
      const options = createFetchPostOptions(movie.id, action);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          "Произошла ошибка при добавлении/удалении избранного фильма"
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (
        error.message === "Failed to fetch" ||
        error.message.includes("NetworkError")
      ) {
        dispatch(
          addOrDeleteFavoriteMovie({ movie: movie, isFavorite: !action })
        );
        return rejectWithValue(networkErrorMessage);
      }
      dispatch(addOrDeleteFavoriteMovie(movie, !action));
      return rejectWithValue(error.message || "Неизвестная ошибка");
    }
  }
);

const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState: {
    movies: null,
    status: null,
    error: null,
    isLoading: true,
    dataBaseErrorAddOrRemoveMovie: null,
    dataBaseStatusAddOrRemoveMovie: null,
    dataBaseResultAddOrRemoveMovie: null,
  },
  reducers: {
    addOrDeleteFavoriteMovie(state, action) {
      action.payload.isFavorite
        ? state.movies.push(action.payload.movie)
        : (state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload.movie.id
          ));
    },
    resetAddOrDeleteFavoriteMoviesDataBaseInfo(state) {
      state.dataBaseErrorAddOrRemoveMovie = null;
      state.dataBaseStatusAddOrRemoveMovie = null;
      state.dataBaseResultAddOrRemoveMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFavoriteMovies.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(getFavoriteMovies.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addOrRemoveFavoriteMovieDataBase.pending, (state) => {
        state.dataBaseStatusAddOrRemoveMovie = "pending";
        state.dataBaseErrorAddOrRemoveMovie = null;
        state.dataBaseResultAddOrRemoveMovie = null;
      })
      .addCase(addOrRemoveFavoriteMovieDataBase.fulfilled, (state, action) => {
        state.dataBaseStatusAddOrRemoveMovie = "resolved";
        state.dataBaseErrorAddOrRemoveMovie = null;
        state.dataBaseResultAddOrRemoveMovie = action.payload;
      })
      .addCase(addOrRemoveFavoriteMovieDataBase.rejected, (state, action) => {
        state.dataBaseStatusAddOrRemoveMovie = "rejected";
        state.dataBaseResultAddOrRemoveMovie = action.payload;
        state.dataBaseErrorAddOrRemoveMovie = action.payload;
      });
  },
});

export const {
  addOrDeleteFavoriteMovie,
  resetAddOrDeleteFavoriteMoviesDataBaseInfo,
} = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
