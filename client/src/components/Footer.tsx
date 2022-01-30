import { Box, AppBar, Toolbar, Button } from "@mui/material";

export default function Header() {
  return (
    <footer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button variant="contained">Pick Degree</Button>
            <Button variant="contained">Get Requirements</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </footer>
  );
}
