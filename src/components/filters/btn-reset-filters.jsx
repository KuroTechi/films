import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../store/filtersSlice";
import { resetMoviesBySearch } from "../../store/moviesBySearchSlice";

function ResetFiltersButton() {
  const dispatch = useDispatch();
  const handleResetFiltersAndMoviesBySearch = () => {
    dispatch(resetFilters());
    dispatch(resetMoviesBySearch());
  };

  return (
    <Box sx={{ padding: "12px" }}>
      <IconButton onClick={handleResetFiltersAndMoviesBySearch}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
}

export { ResetFiltersButton };
