import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { AuthorizationAndRegistration } from "../authorization-registration/auth-or-reg";
import { AppMenuIcon } from "../profile/app-menu-icon";
import { getAndValidateLocalStorageItem } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUserToken } from "../../store/userInfoSlice";
import { BackToMainPageButton } from "./back-button";

function MenuAppBar({ title = "Фильмы - Главная", backButton }) {
  const dispatch = useDispatch();
  const userTokenLocalStorage = getAndValidateLocalStorageItem("token");
  const userTokenStore = useSelector((state) => state.userInfo.userToken);

  useEffect(() => {
    if (userTokenLocalStorage) {
      dispatch(addUserToken({ userToken: userTokenLocalStorage }));
    }
  }, [dispatch, userTokenLocalStorage]);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "default" }}
          >
            {title}
          </Typography>
          {backButton && <BackToMainPageButton />}
          {!userTokenStore ? <AuthorizationAndRegistration /> : <AppMenuIcon />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export { MenuAppBar };
