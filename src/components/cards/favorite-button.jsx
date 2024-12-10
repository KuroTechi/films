import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useDispatch } from "react-redux";
import { addOrRemoveFavoriteMovieDataBase } from "../../store/favoriteMoviesSlice";

function FavoriteButton({ isFavorite, movie }) {
  const dispatch = useDispatch();

  const handleAddFavoriteMovie = () => {
    dispatch(addOrRemoveFavoriteMovieDataBase({ movie: movie, action: true }));
  };

  const handleDeleteFavoriteMovie = () => {
    dispatch(addOrRemoveFavoriteMovieDataBase({ movie: movie, action: false }));
  };

  return (
    <>
      {isFavorite ? (
        <StarRateIcon
          onClick={handleDeleteFavoriteMovie}
          sx={{ cursor: "pointer", color: "rgba(0, 0, 0, 0.6)" }}
        />
      ) : (
        <StarBorderIcon
          onClick={handleAddFavoriteMovie}
          sx={{ cursor: "pointer", color: "rgba(0, 0, 0, 0.6)" }}
        />
      )}
    </>
  );
}

export { FavoriteButton };
