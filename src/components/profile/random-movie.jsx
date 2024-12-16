import { Box, Button, Collapse, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomMovie,
  resetFilters,
  setAverageRating,
} from "../../store/randomMovieSlice";
import { AutohideSnackbar } from "../cards/auto-hide-Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { SingleMovieCard } from "../cards/single-movie-card";
function RandomMovie() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const randomMovieError = useSelector((state) => state.randomMovie.error);
  const [isOpen, setIsOpen] = useState(true);

  const handleSnakeBarOpen = () => {
    setOpenSnackBar(false);
    setTimeout(() => {
      setOpenSnackBar(true);
    }, 150);
  };

  useEffect(() => {
    if (randomMovieError) {
      setErrorMessage(randomMovieError);
      handleSnakeBarOpen();
    }
  }, [randomMovieError]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AutohideSnackbar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        errorMessage={errorMessage}
      />
      <MainPageContainer>
        <Box sx={{ width: "300px" }}>
          <Paper sx={{ padding: "10px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  cursor: "default",
                  userSelect: "none",
                }}
              >
                Параметры
              </Typography>
              <IconButton onClick={toggleCollapse}>
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Box>
            <Collapse in={isOpen}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <AverageRating />
                <ResetButton />
                <SearchButton />
              </Box>
            </Collapse>
          </Paper>
          <RandomMovieCard />
        </Box>
      </MainPageContainer>
    </>
  );
}

const AverageRating = () => {
  const dispatch = useDispatch();
  const averageRating = useSelector(
    (state) => state.randomMovie.filters.averageRating
  );
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (newValue >= 1 && newValue <= 9)) {
      dispatch(setAverageRating({ averageRating: newValue }));
    }
  };

  return (
    <Box sx={{ paddingTop: "10px" }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Минимальная оценка"
          variant="outlined"
          type="number"
          value={averageRating}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
            "& .MuiFormHelperText-root": {
              textAlign: "center",
            },
          }}
        />
      </Box>
    </Box>
  );
};

const ResetButton = () => {
  const dispatch = useDispatch();
  const randomMovie = useSelector((state) => state.randomMovie.movie);
  const averageRating = useSelector(
    (state) => state.randomMovie.filters.averageRating
  );
  const isLoading = useSelector((state) => state.randomMovie.isLoading);
  const isDisabled = (!randomMovie && !averageRating) || isLoading;
  const handleClick = () => {
    dispatch(resetFilters());
  };

  return (
    <Box>
      <Button
        disabled={isDisabled}
        onClick={handleClick}
        size="small"
        variant="outlined"
      >
        Сбросить
      </Button>
    </Box>
  );
};

const SearchButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.randomMovie.isLoading);
  const averageRating = useSelector(
    (state) => state.randomMovie.filters.averageRating
  );
  const handleClick = () => {
    dispatch(getRandomMovie({ averageRating: averageRating }));
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        size="medium"
        disabled={isLoading}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {isLoading && <CircularProgress size={20} />} {/* Спиннер */}
        {isLoading ? "Загрузка..." : "Найти"}
      </Button>
    </Box>
  );
};

const RandomMovieCard = () => {
  const randomMovie = useSelector((state) => state.randomMovie.movie);
  const favoriteMovies = useSelector((state) => state.favoriteMovies?.movies);
  return (
    <Box sx={{ paddingTop: "10px" }}>
      {(randomMovie && randomMovie !== "Фильм не найден" && (
        <SingleMovieCard movie={randomMovie} favoriteMovies={favoriteMovies} />
      )) ||
        randomMovie}
    </Box>
  );
};

const MainPageContainer = ({ children }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>{children}</Box>
  );
};

export { RandomMovie };
