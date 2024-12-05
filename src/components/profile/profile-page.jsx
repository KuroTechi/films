import { MenuAppBar } from "../header/app-bar";
import { VerticalTabs } from "./side-menu";

function ProfilePage() {
  return (
    <div
      style={{
        // maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <MenuAppBar title={"Фильмы - Профиль"} backButton={true} />
      <div style={{ marginTop: "10px" }}>
        <div></div>
        <VerticalTabs />
      </div>
    </div>
  );
}

export { ProfilePage };
