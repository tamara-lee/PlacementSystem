import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";
import { styled } from "@mui/material/styles";
import logo from "../../images/logo.png";
import { NavLink, useHistory } from "react-router-dom";

const pages = ["My Placement Record", "FAQ"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavigationBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#257F2F",
  }));

  const StyledNavLink = styled(NavLink)`
    color: "white";
  `;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const history = useHistory();

  const logoutFunction = () => {
    // console.log("Logout button clicked!");
    return history.push("/logout");
  };

  const toggleFunction = () => {
    alert("Switch button clicked!");
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: "600",
            }}
          >
            <img className="nav-logo" src={logo} />
          </Typography>
          <div>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: "600",
                marginTop: "0.5rem",
              }}
            >
              Internship Placement System
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <StyledNavLink
                to="/mainpage/admin"
                activeClassName="link-active"
                sx={{
                  marginTop: 1,
                  color: "white",
                  display: "block",
                  minWidth: "14rem",
                  minHeight: "2rem",
                  textDecoration: "none",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    marginTop: "5px",
                  }}
                >
                  Student Records
                </Typography>
              </StyledNavLink>
              <StyledNavLink
                to="/addstudents/admin"
                activeClassName="link-active"
                sx={{
                  marginTop: 1,
                  color: "white",
                  display: "block",
                  minWidth: "14rem",
                  minHeight: "2rem",
                  "&:active": {
                    backgroundColor: "#18521F",
                  },
                  textDecoration: "none",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    marginTop: "5px",
                  }}
                >
                  Add Student(s)
                </Typography>
              </StyledNavLink>
              <StyledNavLink
                to="/faq/admin"
                activeClassName="link-active"
                sx={{
                  marginTop: 1,
                  color: "white",
                  display: "block",
                  minWidth: "14rem",
                  minHeight: "2rem",
                  "&:active": {
                    backgroundColor: "#18521F",
                  },
                  textDecoration: "none",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    marginTop: "5px",
                  }}
                >
                  FAQ
                </Typography>
              </StyledNavLink>
            </Box>
          </div>

          <Box
            noWrap
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "none" },
              whiteSpace: "none",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                width: "10px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <StyledNavLink
                  to="/mainpage/admin"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Student Records
                  </Typography>
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink
                  to="/addstudents/admin"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Add Student(s)
                  </Typography>
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to="/faq/admin" sx={{ textDecoration: "none" }}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    FAQ
                  </Typography>
                </StyledNavLink>
              </MenuItem>
              {/* <MenuItem>
                <StyledNavLink to="/faq" sx={{ textDecoration: "none" }}>
                  <Typography
                    textAlign="center"
                    onClick={toggleFunction}
                    sx={{
                      display: { xs: "flex", md: "none" },
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Switch to Student View
                  </Typography>
                </StyledNavLink>
              </MenuItem> */}
            </Menu>
          </Box>
          <div className="mobile-header">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <img className="nav-logo-small" src={logo} />
            </Typography>
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                fontWeight: "bold",
              }}
            >
              Internship Placement System
            </Typography>
          </div>
          {/* <Box>
            <Typography
              textAlign="center"
              onClick={toggleFunction}
              sx={{
                display: { xs: "none", md: "flex" },
                position: "relative",
                right: "0rem",
                width: "auto",
                marginTop: "-2rem",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Switch to Student View
            </Typography>
          </Box> */}
          <Box sx={{ flexGrow: 0 }}>
            <Typography
              textAlign="center"
              onClick={logoutFunction}
              sx={{ display: { xs: "flex", md: "none" }, fontSize: "0.8rem" }}
            >
              Logout
            </Typography>
            <Typography
              textAlign="center"
              onClick={logoutFunction}
              sx={{
                display: { xs: "none", md: "flex" },
                position: "relative",
                right: "3rem",
                width: "6rem",
                marginTop: "3rem",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
export default NavigationBar;
