import { Box } from "@mui/material";
import { MenuAppBar } from "../header/app-bar";
import { VerticalTabs } from "./side-menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../store/favoriteMoviesSlice";
import Spinner from "../spinner/spinner";
import { getUserInfo } from "../../store/userInfoSlice";

function ProfilePage() {
  const dispatch = useDispatch();
  const isLoadingFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.isLoading
  );
  const isLoadingUserInfo = useSelector((state) => state.userInfo.isLoading);
  const shouldShowSpinner = isLoadingFavoriteMovies || isLoadingUserInfo;
  useEffect(() => {
    dispatch(getFavoriteMovies());
    dispatch(getUserInfo({ userId: 20039690 }));
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
