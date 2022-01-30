import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import IUser from "../types/IUser";
import { handleLoginClick } from "../utils/auth";
import AccountMenu from "./AccountMenu";

interface HeaderProps {
  user: IUser | undefined;
}

export default function Header(props: HeaderProps) {
  const { user } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plan@Brown
          </Typography>
          {user ? (
            <AccountMenu user={user} />
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
