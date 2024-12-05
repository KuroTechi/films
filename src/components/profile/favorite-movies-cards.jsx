import { Box } from "@mui/material";
import { SingleMovieCard } from "../cards/single-movie-card.jsx";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../store/favoriteMoviesSlice.js";
import { AutohideSnackbar } from "../cards/auto-hide-Snackbar.jsx";

function FavoriteMoviesCards() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const isLoadingFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.isLoading
  );

  const dataBaseErrorAddOrRemoveFavoriteMovie = useSelector(
    (state) => state.favoriteMovies.dataBaseErrorAddOrRemoveMovie
  );

  const favoriteMoviesError = useSelector(
    (state) => state.favoriteMovies.error
  );
  const favoriteMovies = useSelector((state) => state.favoriteMovies?.movies);

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
    if (favoriteMoviesError) {
      setErrorMessage(favoriteMoviesError);
      handleSnakeBarOpen();
    }
  }, [favoriteMoviesError]);
  if (isLoadingFavoriteMovies) {
    return <Spinner />;
  }
  if (!favoriteMovies || favoriteMovies.length === 0) {
    return "Нет избранных фильмов";
  }
  return (
    <>
      <AutohideSnackbar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        errorMessage={errorMessage}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {favoriteMovies?.map((movie) => {
          return (
            <SingleMovieCard
              key={movie.id}
              movie={movie}
              favoriteMovies={favoriteMovies}
            />
          );
        })}
      </Box>
    </>
  );
}

export { FavoriteMoviesCards };
