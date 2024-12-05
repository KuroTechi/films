import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
function MoviesNotFound({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "5px",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography sx={{ padding: "16px", fontWeight: "500" }} variant="h5">
        Фильм не найден, {message}
      </Typography>
      <SearchOffIcon />
    </Box>
  );
}

export { MoviesNotFound };
