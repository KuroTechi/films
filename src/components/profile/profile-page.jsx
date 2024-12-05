import { Box } from "@mui/material";
import { MenuAppBar } from "../header/app-bar";
import { VerticalTabs } from "./side-menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../store/favoriteMoviesSlice";
import Spinner from "../spinner/spinner";

function ProfilePage() {
  const dispatch = useDispatch();
  const isLoadingFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.isLoading
  );
  const shouldShowSpinner = isLoadingFavoriteMovies;
  useEffect(() => {
    dispatch(getFavoriteMovies());
  }, [dispatch]);

  return (
    <Wrapper>
      <MenuAppBar title={"Фильмы - Профиль"} backButton={true} />
      {shouldShowSpinner ? <Spinner /> : <VerticalTabs />}
    </Wrapper>
  );
}

function Wrapper({ children }) {
  return <Box sx={{ margin: "0 auto", width: "100%" }}>{children}</Box>;
}

export { ProfilePage };
