import { useDispatch, useSelector } from "react-redux";
import "./AboutUser.css";
import { removeLocalStorageItem } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { removeUserToken } from "../../store/userInfoSlice";
function AboutUser() {
  return <UserCard />;
}

function UserCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const image_path = "hvpsuPeAFEmSiKYcb8kCxkWO0om.jpg";
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const full_url = `${base_url}${image_path}`;
  const handleLogout = () => {
    removeLocalStorageItem("token");
    navigate("/");
    dispatch(removeUserToken());
  };
  return (
    <div className="about-user">
      <div className="profile-picture">
        <img src={full_url} alt="User Avatar" />
      </div>
      <div className="user-info">
        <h2>{userInfo.name ? userInfo.name : "Имя не указано"}</h2>
        <p>
          <strong>Логин:</strong> {userInfo.username}
        </p>
        <p>
          <strong>ID:</strong> {userInfo.id}
        </p>
        <button onClick={handleLogout} className="logout-button">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
export { AboutUser };
