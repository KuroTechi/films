import { MenuAppBar } from "../header/app-bar";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
function ErrorPage({ showBackButton }) {
  const moviesByFiltersError = useSelector(
    (state) => state.moviesByFilters.error
  );
  const moviesBySearchError = useSelector(
    (state) => state.moviesBySearch.error
  );
  const favoriteMoviesError = useSelector(
    (state) => state.favoriteMovies.error
  );
  const errors = [
    moviesByFiltersError,
    moviesBySearchError,
    favoriteMoviesError,
  ];

  let errorMessage = errors.filter((error) => error);
  let errorId = null;
  const handleClickReloadPage = () => {
    window.location.reload();
  };

  return (
    <Box>
      <MenuAppBar title={`Фильмы - Ошибка`} backButton={showBackButton} />
      <Box
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h6">Произошла ошибка</Typography>
        <ul>
          {errorMessage.map((error, index) => (
            <li key={errorId++}>{`${index + 1}. ${error}`}</li>
          ))}
        </ul>
        <Button
          onClick={handleClickReloadPage}
          sx={{ backgroundColor: "#1976d2" }}
          variant="contained"
        >
          Перезагрузить страницу
        </Button>
      </Box>
    </Box>
  );
}

export { ErrorPage };
