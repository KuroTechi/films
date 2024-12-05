import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { UserIconButton } from "./icon-button";
function Registration({ open, handleOpen, handleCloseReg, handleOpenAuth }) {
  return (
    <div>
      <UserIconButton handleOpen={handleOpen} />
      {open && (
        <FormDialog
          open={open}
          handleCloseReg={handleCloseReg}
          handleOpenAuth={handleOpenAuth}
        />
      )}
    </div>
  );
}

function FormDialog({ open, handleCloseReg, handleOpenAuth }) {
  const [value, setValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(inputValue));
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseReg}>
        <DialogTitle>Запросить токен</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите почту на которую будет отправлен специальный код для
            дальнейшего доступа к функционалу сайта.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Почта"
            value={value}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            helperText={
              value && !isValidEmail
                ? "Пожалуйста, введите корректный email"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReg}>Закрыть</Button>
          <Button
            disabled={!isValidEmail}
            onClick={() => {
              handleOpenAuth();
            }}
            type="submit"
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { Registration };
