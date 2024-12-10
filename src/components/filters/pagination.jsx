import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFiltersPaginationPage } from "../../store/filtersSlice";
import { setSearchPaginationPage } from "../../store/moviesBySearchSlice";
function FiltersPagination() {
  const dispatch = useDispatch();

  const moviesByFilters = useSelector((state) => state.moviesByFilters.movies);
  const moviesBySearch = useSelector((state) => state.moviesBySearch.movies);
  const paginationPageFilters = useSelector(
    (state) => state.filters.paginationPage
  );
  const paginationPageSearch = useSelector(
    (state) => state.moviesBySearch.paginationPage
  );
  const movieName = useSelector((state) => state.moviesBySearch.movieName);
  const trimmedMovieName = movieName.trim();

  const handleChangeSearchMoviesPage = (e, newValue) => {
    dispatch(setSearchPaginationPage({ page: newValue }));
  };
  const handleChangeFiltersMoviesPage = (e, newValue) => {
    dispatch(setFiltersPaginationPage({ page: newValue }));
  };
  return (
    <>
      {moviesBySearch && trimmedMovieName ? (
        <Pagination
          sx={{ padding: "16px" }}
          size="small"
          page={paginationPageSearch}
          count={
            moviesBySearch?.total_pages > 500
              ? 500
              : moviesBySearch?.total_pages
          }
          onChange={handleChangeSearchMoviesPage}
        />
      ) : (
        <Pagination
          sx={{ padding: "16px" }}
          size="small"
          page={paginationPageFilters}
          count={
            moviesByFilters?.total_pages > 500
              ? 500
              : moviesByFilters?.total_pages
          }
          onChange={handleChangeFiltersMoviesPage}
        />
      )}
    </>
  );
}

export { FiltersPagination };
