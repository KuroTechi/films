import { Paper, Box, Typography } from "@mui/material";
import SortBy from "./sort-by";
import { ResetFiltersButton } from "./btn-reset-filters";
import YearsSlider from "./years-slider";
import GenresSelect from "./genres-select";
import { FiltersPagination } from "./pagination";
import { generateUrl } from "../cards/utils";
import { SearchMovie } from "./search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesByFilters } from "../../store/moviesByFiltersSlice";
function Filters() {
  const dispatch = useDispatch();
  const {
    paginationPage: paginationPageFilters,
    sortBy,
    yearsRange,
    genres,
  } = useSelector((state) => state.filters);

  const movieName = useSelector((state) => state.moviesBySearch.movieName);
  const moviesBySearch = useSelector((state) => state.moviesBySearch.movies);

  useEffect(() => {
    if (movieName || moviesBySearch) {
      return;
    }
    const url = generateUrl(genres, sortBy, yearsRange, paginationPageFilters);
    const debounceTimer = setTimeout(() => {
      dispatch(getMoviesByFilters({ url: url }));
    }, 200);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [
    dispatch,
    genres,
    paginationPageFilters,
    sortBy,
    yearsRange,
    movieName,
    moviesBySearch,
  ]);

  return (
    <Paper
      sx={{
        maxWidth: "188.750px",
        maxHeight: "1000px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ padding: "16px", fontWeight: "Bold" }} variant="h6">
          Фильтры
        </Typography>
        <ResetFiltersButton />
      </Box>
      <SearchMovie />
      <SortBy />
      <YearsSlider />
      <GenresSelect />
      <FiltersPagination />
    </Paper>
  );
}

export { Filters };
