import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { truncateString, getImgUrl, formatVoteAverage } from "./utils";
import { Link } from "react-router-dom";
import { FavoriteButton } from "./favorite-button";

function SingleMovieCard({ movie, favoriteMovies }) {
  const imgUrl = getImgUrl(movie?.backdrop_path, movie?.poster_path);
  const movieTitle = truncateString(movie?.title || movie?.original_title);
  const movieVoteAverage = formatVoteAverage(movie?.vote_average);
  const movieId = movie?.id;
  const isFavorite = favoriteMovies?.find(
    (favoriteMovie) => favoriteMovie.id === movieId
  );

  return (
    <Card sx={{ maxWidth: "296px", maxHeight: "324px" }}>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/details/${movieId}`}
      >
        <CardMedia
          sx={{ width: "296px", height: "240px" }}
          component="img"
          alt="image"
          image={imgUrl}
        />
      </Link>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          {movieTitle}
          <Link
            to={`details/${movieId}`}
            style={{ display: "inline-flex", textDecoration: "none" }}
          >
            <InfoIcon sx={{ color: "#2196F3" }} />
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Рейтинг {movieVoteAverage}
          </Typography>
          <FavoriteButton isFavorite={isFavorite} movie={movie} />
        </Box>
      </CardContent>
    </Card>
  );
}

export { SingleMovieCard };
