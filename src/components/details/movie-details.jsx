import { Box, Typography } from "@mui/material";
import { formattedStringFromArray, formatTime, getYearFromDate } from "./utils";

function Details({ details }) {
  const productionCountries = details.production_countries.map(
    (item) => item.name
  );
  const formattedCountries = formattedStringFromArray(productionCountries);

  const genres = details.genres.map((item) => item.name);
  const formattedGenres = formattedStringFromArray(genres);

  const realiseYear = getYearFromDate(details.release_date);

  const runtime = details.runtime;
  const formattedRuntime = formatTime(runtime);
  const voteCount = details.vote_count || "Не указано";
  const movieVoteAverage = details.vote_average.toFixed(1) || "Не указано";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingTop: "10px",
      }}
    >
      <Typography variant="h6">{details.overview}</Typography>
      <Typography sx={{ padding: "24px 0px 24px 0px" }} variant="h4">
        Детали
      </Typography>
      <TypographyDetails title="Страна" details={formattedCountries} />
      <TypographyDetails title="Год" details={realiseYear} />
      <TypographyDetails title="Оценка" details={movieVoteAverage} />
      <TypographyDetails title="Количество оценок" details={voteCount} />
      <TypographyDetails title="Время" details={formattedRuntime} />
      <TypographyDetails title="Жанр" details={formattedGenres} />
    </Box>
  );
}

const TypographyDetails = ({ title, details }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography sx={{ width: "200px" }} variant="subtitle1">
        {title}
      </Typography>
      <Typography sx={{ width: "200px" }} variant="subtitle1">
        {details}
      </Typography>
    </Box>
  );
};

export { Details };
