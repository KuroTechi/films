import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setTokenLocalStorage, validateUserAPIKey } from "./action";
import { useState } from "react";
import { UserIconButton } from "./icon-button";

function Authorization({ open, handleOpen, handleCloseAuth, handleCloseReg }) {
  return (
    <div>
      <UserIconButton handleOpen={handleOpen} />
      {open && (
        <FormDialog
          open={open}
          handleCloseAuth={handleCloseAuth}
          handleCloseReg={handleCloseReg}
        />
      )}
    </div>
  );
}

function FormDialog({ open, handleCloseAuth, handleCloseReg }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disalbeDialog, setDisableDialog] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(false);
  };

  async function validateUserKey() {
    setDisableDialog(true);
    const response = await validateUserAPIKey(value);
    switch (response) {
      case "valid token": {
        setTokenLocalStorage(value);
        setDisableDialog(false);
        handleCloseAuth();
        handleCloseReg();
        window.location.reload();
        break;
      }
      case "invalid token": {
        setError(true);
        setErrorMessage("Введён неверный код");
        setDisableDialog(false);
        break;
      }
      case "connect API error": {
        setError(true);
        setErrorMessage("Произошла ошибка при соединении, попробуйте позже.");
        setDisableDialog(false);
        break;
      }
      default: {
        setError(true);
        setErrorMessage("Неизвестная ошибка");
        setDisableDialog(false);
      }
    }
  }
  return (
    <>
      <Dialog open={open} onClose={handleCloseAuth}>
        <DialogTitle>Введите токен</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите специальный код, который был отправлен на почту.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="token"
            label="Токен"
            value={value}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            disabled={disalbeDialog}
            error={error}
            helperText={error ? errorMessage : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={disalbeDialog} onClick={handleCloseAuth}>
            Назад
          </Button>
          <Button
            disabled={!value || disalbeDialog}
            onClick={() => {
              validateUserKey();
            }}
            type="button"
          >
            Войти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { Authorization };
