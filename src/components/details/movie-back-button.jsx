import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={handleClick} sx={{ padding: "0px" }}>
      <ArrowBackIcon
        sx={{
          maxWidth: "40px",
          maxHeigh: "4Opx",
          width: "100%",
          height: "100%",
        }}
      />
    </IconButton>
  );
}

export { BackButton };
