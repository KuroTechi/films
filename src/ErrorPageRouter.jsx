import { useRouteError, Link } from "react-router-dom";
import { MenuAppBar } from "./components/header/app-bar";
import { Box, Button, Typography } from "@mui/material";

function ErrorPageRouter() {
  const error = useRouteError();
  console.error(error);
  const errorMessage =
    error?.status === 404
      ? "Страница не найдена"
      : error?.statusText || error?.message || "Произошла неизвестная ошибка";

  return (
    <Box
      sx={{
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <MenuAppBar title={`Фильмы - Ошибка`} />
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h6">Произошла ошибка</Typography>
        <p>
          <i> {errorMessage}</i>
        </p>
        <Link to="/">
          <Button sx={{ backgroundColor: "#1976d2" }} variant="contained">
            Вернуться на главную
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export { ErrorPageRouter };
