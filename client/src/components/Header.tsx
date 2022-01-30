import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import IUser from "../types/IUser";
import { handleLoginClick, handleLogoutClick } from "../utils/auth";
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
            // <Box sx={{ display: "inline-flex" }}>
            //   <Avatar src={user.picture} />
            //   <Button onClick={handleLogoutClick} color="inherit">
            //     Logout
            //   </Button>
            // </Box>
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
