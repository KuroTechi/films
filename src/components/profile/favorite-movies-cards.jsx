import { Box } from "@mui/material";
import { SingleMovieCard } from "../cards/single-movie-card.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AutohideSnackbar } from "../cards/auto-hide-Snackbar.jsx";

function FavoriteMoviesCards() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const shoudShowMessageNoFavoriteMovies =
    !favoriteMovies || favoriteMovies.length === 0;

  return (
    <>
      <AutohideSnackbar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        errorMessage={errorMessage}
      />
      <Container>
        {shoudShowMessageNoFavoriteMovies && "Нет избранных фильмов"}
        {favoriteMovies?.map((movie) => {
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

export { FavoriteMoviesCards };
