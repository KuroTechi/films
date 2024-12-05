import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesBySearch,
  resetMoviesBySearch,
  setMovieName,
} from "../../store/moviesBySearchSlice";

function SearchMovie() {
  const dispatch = useDispatch();
  const movieName = useSelector((state) => state.moviesBySearch.movieName);
  const paginationPage = useSelector(
    (state) => state.moviesBySearch.paginationPage
  );

  const handleChangeMovieName = (event) => {
    if (!event.target.value.trim()) {
      dispatch(resetMoviesBySearch());
    }

    dispatch(setMovieName({ movieName: event.target.value }));
  };

  useEffect(() => {
    const trimmedName = movieName.trim();

    if (!trimmedName) {
      return;
    }
    const debounceTimer = setTimeout(() => {
      dispatch(
        getMoviesBySearch({ movieName: trimmedName, page: paginationPage })
      );
    }, 200);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dispatch, movieName, paginationPage]);

  return (
    <Box sx={{ maxWidth: "300px", padding: "0px 16px 24px 16px" }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Название"
          variant="standard"
          value={movieName}
          onChange={handleChangeMovieName}
        />
      </Box>
    </Box>
  );
}

export { SearchMovie };
