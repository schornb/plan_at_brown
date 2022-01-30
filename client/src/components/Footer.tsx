import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar } from "@mui/material";
import React from "react";
import IUser from "../types/IUser";
import { handleLoginClick, handleLogoutClick } from "../utils/auth";
import AccountMenu from "./AccountMenu";

export default function Header() {
  return (
    <footer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button variant="contained" onClick={handleResults}></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </footer>
  );
}
