import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function UserIconButton({ handleOpen }) {
  return (
    <IconButton
      size="small"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleOpen}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  );
}

export { UserIconButton };
