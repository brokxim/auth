import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <Button
          type="button"
          size="small"
          color="success"
          variant="contained"
          onClick={() => loginWithRedirect()}
        >
          Sign In
        </Button>
      )}
    </>
  );
};

export default LoginButton;
