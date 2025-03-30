import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Overall Analysis", path: "/" },
    { text: "Physics", path: "/physics" },
    { text: "Chemistry", path: "/chemistry" },
    { text: "Biology", path: "/biology" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          {/* Logo and Title - Stay on the Left */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img src="/prepInsight.png" alt="PrepInsight Logo" style={{ height: 40, marginRight: 10 }} />
              <Typography variant="h6" sx={{ color: "white" }}>
                NEET Analysis
              </Typography>
            </Link>
          </Box>

          {/* Hamburger Icon - Move to Right on Small Screens */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ marginLeft: "auto", display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, marginLeft: "auto" }}>
            {menuItems.map((item) => (
              <Typography key={item.text} variant="body1">
                <Link to={item.path} style={{ color: "white", textDecoration: "none" }}>
                  {item.text}
                </Link>
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
