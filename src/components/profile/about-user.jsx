import { useDispatch, useSelector } from "react-redux";
import "./AboutUser.css";
import { removeLocalStorageItem } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { removeUserToken } from "../../store/userInfoSlice";
import { Box, Typography } from "@mui/material";
function AboutUser() {
  return <UserCard />;
}

function UserCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo?.userInfo);
  const image_path = userInfo?.avatar?.tmdb?.avatar_path;
  console.log(image_path);

  const base_url = "https://image.tmdb.org/t/p/w500";
  const full_url = image_path ? `${base_url}${image_path}` : null;
  console.log(full_url);

  const handleLogout = () => {
    removeLocalStorageItem("token");
    navigate("/");
    dispatch(removeUserToken());
  };
  return (
    <Box className="about-user">
      <Box className="profile-picture">
        {full_url && <img src={full_url} alt="User Avatar" />}
      </Box>
      <Box className="user-info">
        <Typography component={"h2"}>
          {userInfo?.name ? userInfo.name : "Имя не указано"}
        </Typography>
        <Typography component={"p"}>
          <strong>Логин:</strong> {userInfo?.username || "не указан"}
        </Typography>
        <Typography component={"p"}>
          <strong>ID:</strong> {userInfo?.id || "не указан"}
        </Typography>
        <button onClick={handleLogout} className="logout-button">
          Выйти из аккаунта
        </button>
      </Box>
    </Box>
  );
}
export { AboutUser };
