import { Snackbar } from "@mui/material";

function AutohideSnackbar({
  openSnackBar,
  setOpenSnackBar,
  errorMessage = "Произошла ошибка,повторите позже",
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={2000}
      onClose={handleClose}
      message={errorMessage}
      ContentProps={{
        sx: {
          padding: "5px",
          justifyContent: "center",
          width: "100%",
        },
      }}
    />
  );
}

export { AutohideSnackbar };
