import { Box } from "@mui/material";
import { MenuAppBar } from "../header/app-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../store/favoriteMoviesSlice";
import Spinner from "../spinner/spinner";
import { getUserInfo } from "../../store/userInfoSlice";
import Button from "@mui/material/Button";
import { FavoriteMoviesCards } from "./favorite-movies-cards";
import { AboutUser } from "./about-user";
function ProfilePage() {
  const [openPage, setOpenPage] = useState("Избранные фильмы");
  const dispatch = useDispatch();

  const isLoadingUserInfo = useSelector((state) => state.userInfo.isLoading);
  const isLoadingFavoriteMovies = useSelector(
    (state) => state.favoriteMovies.isLoading
  );
  const shouldShowSpinner = isLoadingFavoriteMovies || isLoadingUserInfo;

  useEffect(() => {
    dispatch(getFavoriteMovies());
    dispatch(getUserInfo({ userId: 20039690 }));
  }, [dispatch]);

  const handleSetPage = (page) => {
    setOpenPage(page);
  };

  const pages = ["Избранные фильмы", "Аккаунт", "Случайный фильм"];
  const appBarTitle = "Фильмы - Профиль";

  return (
    <Wrapper>
      <MenuAppBar title={appBarTitle} backButton={true} />
      {shouldShowSpinner ? (
        <Spinner />
      ) : (
        <NavigationButtons
          pages={pages}
          openPage={openPage}
          handleSetPage={handleSetPage}
        />
      )}
    </Wrapper>
  );
}

function NavigationButtons({ openPage, pages, handleSetPage }) {
  return (
    <>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0px 10px 0px",
        }}
      >
        {pages.map((page, index) => (
          <Button
            disabled={openPage === page}
            key={index}
            onClick={() => handleSetPage(page)}
          >
            {page}
          </Button>
        ))}
      </Box>
      <Box component={"div"}>
        {openPage === pages[0] && <FavoriteMoviesCards />}
        {openPage === pages[1] && <AboutUser />}
      </Box>
    </>
  );
}

function Wrapper({ children }) {
  return <Box sx={{ margin: "0 auto", width: "100%" }}>{children}</Box>;
}

export { ProfilePage };
