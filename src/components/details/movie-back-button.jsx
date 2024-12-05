import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Link to={`/`}>
      <IconButton sx={{ padding: "0px" }}>
        <ArrowBackIcon
          sx={{
            maxWidth: "40px",
            maxHeigh: "4Opx",
            width: "100%",
            height: "100%",
          }}
        />
      </IconButton>
    </Link>
  );
}

export { BackButton };
