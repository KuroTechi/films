import { useState } from "react";
import { Registration } from "./registration";
import { Authorization } from "./authorization";
function AuthorizationAndRegistration() {
  const [openReg, setOpenReg] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const handleOpenReg = () => {
    setOpenReg(true);
  };

  const handleCloseReg = () => {
    setOpenReg(false);
  };

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  if (!openAuth) {
    return (
      <Registration
        open={openReg}
        handleOpen={handleOpenReg}
        handleCloseReg={handleCloseReg}
        handleOpenAuth={handleOpenAuth}
      />
    );
  } else {
    return (
      <Authorization
        open={openAuth}
        handleOpen={handleOpenAuth}
        handleCloseAuth={handleCloseAuth}
        handleCloseReg={handleCloseReg}
      />
    );
  }
}

export { AuthorizationAndRegistration };
