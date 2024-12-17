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
import { useDispatch, useSelector } from "react-redux";
import {
  removeValidateUserTokenError,
  validateUserToken,
} from "../../store/userInfoSlice";
import { useEffect } from "react";

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

function FormDialog({ open, handleCloseAuth }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const isLoading = useSelector(
    (state) => state.userInfo.validateUserToken.isLoading
  );
  const errorValidateToken = useSelector(
    (state) => state.userInfo.validateUserToken.error
  );
  const resultValidateToken = useSelector(
    (state) => state.userInfo.validateUserToken?.result?.success
  );
  useEffect(() => {
    if (resultValidateToken) {
      window.location.reload();
    }
  }, [resultValidateToken]);

  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(removeValidateUserTokenError());
  };

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
            disabled={isLoading}
            error={errorValidateToken && true}
            helperText={errorValidateToken ? errorValidateToken : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleCloseAuth}>
            Назад
          </Button>
          <Button
            disabled={!value || isLoading}
            onClick={() => {
              dispatch(validateUserToken({ token: value }));
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
