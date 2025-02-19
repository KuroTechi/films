import { Box } from "@mui/material";
import { SingleMovieCard } from "./single-movie-card.jsx";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner.jsx";
import { MoviesNotFound } from "./movies-not-found-by-search.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../store/favoriteMoviesSlice.js";
import { AutohideSnackbar } from "./auto-hide-Snackbar.jsx";

function MoviesCards() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const isLoadingFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.isLoading
  );
  const isLoadingMoviesByFilters = useSelector(
    (state) => state.moviesByFilters.isLoading
  );
  const isLoadingOptionsForGenresSelect = useSelector(
    (state) => state.utils.genresForSelect.isLoading
  );
  const dataBaseErrorAddOrRemoveFavoriteMovie = useSelector(
    (state) => state.favoriteMovies.dataBaseErrorAddOrRemoveMovie
  );
  const moviesByFiltersError = useSelector(
    (state) => state.moviesByFilters.error
  );
  const moviesBySearchError = useSelector(
    (state) => state.moviesBySearch.error
  );
  const favoriteMoviesError = useSelector(
    (state) => state.favoriteMovies.error
  );
  const favoriteMovies = useSelector((state) => state.favoriteMovies?.movies);
  const moviesByFilters = useSelector((state) => state.moviesByFilters.movies);
  const genresByFilters = useSelector((state) => state.filters.genres);
  const moviesBySearch = useSelector((state) => state.moviesBySearch?.movies);
  const movieName = useSelector((state) => state.moviesBySearch.movieName);

  const handleSnakeBarOpen = () => {
    setOpenSnackBar(false);
    setTimeout(() => {
      setOpenSnackBar(true);
    }, 150);
  };

  useEffect(() => {
    dispatch(getFavoriteMovies());
  }, [dispatch]);

  useEffect(() => {
    if (dataBaseErrorAddOrRemoveFavoriteMovie) {
      setErrorMessage(dataBaseErrorAddOrRemoveFavoriteMovie);
      handleSnakeBarOpen();
    }
  }, [dataBaseErrorAddOrRemoveFavoriteMovie]);

  useEffect(() => {
    const error =
      moviesByFiltersError || moviesBySearchError || favoriteMoviesError;
    if (error) {
      setErrorMessage(error);
      handleSnakeBarOpen();
    }
  }, [moviesByFiltersError, moviesBySearchError, favoriteMoviesError]);

  const shouldShowLoadingSpinner =
    isLoadingFavoriteMovies ||
    isLoadingMoviesByFilters ||
    isLoadingOptionsForGenresSelect;

  if (shouldShowLoadingSpinner) {
    return <Spinner />;
  }

  const shouldShowNoMoviesBySearch =
    moviesBySearch?.results.length === 0 && movieName.trim();

  if (shouldShowNoMoviesBySearch) {
    return <MoviesNotFound message={"проверьте название"} />;
  }

  const shouldShowNoMoviesByFilters =
    moviesByFilters?.results.length === 0 &&
    genresByFilters.length !== 0 &&
    movieName === "";

  if (shouldShowNoMoviesByFilters) {
    return <MoviesNotFound message={"проверьте выбранные фильтры"} />;
  }

  const shouldShowMoviesBySearch =
    movieName.trim() && moviesBySearch?.results?.length > 0;

  return (
    <>
      <AutohideSnackbar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        errorMessage={errorMessage}
      />
      <Container>
        {shouldShowMoviesBySearch
          ? moviesBySearch?.results?.map((movie) => {
              return (
                <SingleMovieCard
                  key={movie.id}
                  movie={movie}
                  favoriteMovies={favoriteMovies}
                />
              );
            })
          : moviesByFilters?.results?.map((movie) => {
              return (
                <SingleMovieCard
                  key={movie.id}
                  movie={movie}
                  favoriteMovies={favoriteMovies}
                />
              );
            })}
      </Container>
    </>
  );
}

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {children}
    </Box>
  );
};

export { MoviesCards };
