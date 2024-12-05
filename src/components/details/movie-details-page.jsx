import { Box, Typography } from "@mui/material";
import { MenuAppBar } from "../header/app-bar";
import { MovieImg } from "./movie-img";
import { BackButton } from "./movie-back-button";
import { Details } from "./movie-details";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ErrorPage } from "../error-page/error-page";
import { useState } from "react";
import Spinner from "../spinner/spinner";
import { getYearFromDate } from "./utils";
import { Credits } from "./movie-credits";
import { FavoriteButton } from "../cards/favorite-button";
import { useDispatch, useSelector } from "react-redux";
import {
  getCredits,
  getDetails,
  resetDetails,
} from "../../store/movieDetailsSlice";
import {
  getFavoriteMovies,
  resetAddOrDeleteFavoriteMoviesDataBaseInfo,
} from "../../store/favoriteMoviesSlice";
import { AutohideSnackbar } from "../cards/auto-hide-Snackbar";
import { networkErrorMessage } from "../../store/utils/errors";
function MovieDetailsPage() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.movieDetails.details);
  const credits = useSelector((state) => state.movieDetails.credits);
  const isLoadingDetails = useSelector(
    (state) => state.movieDetails.isLoadingDetails
  );
  const isLoadingCredits = useSelector(
    (state) => state.movieDetails.isLoadingCredits
  );
  const dataBaseErrorAddOrRemoveFavoriteMovie = useSelector(
    (state) => state.favoriteMovies.dataBaseErrorAddOrRemoveMovie
  );
  const favoriteMovies = useSelector((state) => state.favoriteMovies.movies);

  const isLoadingFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.isLoading
  );

  const errorFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.error
  );
  const isFavorite = favoriteMovies?.find(
    (favoriteMovie) => favoriteMovie.id === +movieId
  );

  const movieTitle =
    details?.title || details?.original_title || "Нет названия";
  const realiseYear = getYearFromDate(details?.release_date);
  const movieTitleAndYear = `${movieTitle} (${realiseYear})`;

  const handleSnakeBarOpen = () => {
    setOpenSnackBar(false);
    setTimeout(() => {
      setOpenSnackBar(true);
    }, 150);
  };
  useEffect(() => {
    if (dataBaseErrorAddOrRemoveFavoriteMovie) {
      setErrorMessage(networkErrorMessage);
      handleSnakeBarOpen();
    }
  }, [dataBaseErrorAddOrRemoveFavoriteMovie]);

  useEffect(() => {
    dispatch(getDetails({ movieId: movieId }));
    dispatch(getCredits({ movieId: movieId }));
    dispatch(getFavoriteMovies());
    return () => {
      dispatch(resetDetails());
      dispatch(resetAddOrDeleteFavoriteMoviesDataBaseInfo());
    };
  }, [movieId, dispatch]);

  if (errorFavoriteMovies) {
    return <ErrorPage errorMessage={errorFavoriteMovies} />;
  }

  if (isLoadingDetails || isLoadingCredits || isLoadingFavoriteMovies) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <AutohideSnackbar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        errorMessage={errorMessage}
      />
      <div
        style={{
          // maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <MenuAppBar title={`Фильмы - ${movieTitle}`} />
        <Box
          sx={{
            maxHeight: "777px",
            maxWidth: "1280px",
            display: "flex",
            gap: "24px",
            padding: "24px",
          }}
        >
          <MovieImg details={details} />
          <FavoriteButton isFavorite={isFavorite} movie={details} />
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <TypographyMovieNameAndYear title={movieTitleAndYear} />
            <BackButton />
            <Details details={details} />
            <Credits credits={credits} />
          </Box>
        </Box>
      </div>
    </>
  );
}

export { MovieDetailsPage };

function TypographyMovieNameAndYear({ title }) {
  return (
    <>
      <Typography variant="h3" sx={{ paddingBottom: "10px" }}>
        {title}
      </Typography>
    </>
  );
}
