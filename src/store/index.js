import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import moviesByFiltersReducer from "./moviesByFiltersSlice";
import favoriteMoviesReducer from "./favoriteMoviesSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import moviesBySearchReducer from "./moviesBySearchSlice";
import userInfoReducer from "./userInfoSlice";
import utilsReducer from "./utilsSlice";
import randomMovieReducer from "./randomMovieSlice";
export default configureStore({
  reducer: {
    utils: utilsReducer,
    userInfo: userInfoReducer,
    filters: filtersReducer,
    moviesByFilters: moviesByFiltersReducer,
    favoriteMovies: favoriteMoviesReducer,
    movieDetails: movieDetailsReducer,
    moviesBySearch: moviesBySearchReducer,
    randomMovie: randomMovieReducer,
  },
});
