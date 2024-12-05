import CardMedia from "@mui/material/CardMedia";
import { getImgUrl } from "../cards/utils";
function MovieImg({ details }) {
  const imgUrl = getImgUrl(details?.backdrop_path, details?.poster_path);

  return (
    <CardMedia
      sx={{
        maxWidth: "300px",
        maxHeight: "402px",
      }}
      component="img"
      alt="image"
      image={imgUrl}
    />
  );
}

export { MovieImg };
