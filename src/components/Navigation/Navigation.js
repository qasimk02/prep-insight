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
          {/* Hamburger Icon for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NEET Analysis
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
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
            <ListItem button key={item.text} onClick={handleDrawerToggle}>
              <ListItemText>
                <Link to={item.path} style={{ textDecoration: "none", color: "#3f51b5" }}>
                  {item.text}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
