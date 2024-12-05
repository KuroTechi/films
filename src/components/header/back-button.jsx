import HouseIcon from "@mui/icons-material/House";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
function BackButton() {
  return (
    <Link to={"/"}>
      <Tooltip title="Home">
        <IconButton
          size="small"
          aria-label="back to main page"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          sx={{ color: "white" }}
        >
          <HouseIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
}

export { BackButton };
