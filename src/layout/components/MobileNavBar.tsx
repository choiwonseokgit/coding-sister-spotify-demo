import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const getNavValue = (pathname: string) => {
  if (pathname.startsWith("/search")) return "/search";
  if (pathname.startsWith("/library")) return "/library";
};

const MobileNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(getNavValue(location.pathname));

  useEffect(() => {
    setValue(getNavValue(location.pathname));
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
        zIndex: 10,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Search"
          value="/search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Your Library"
          value="/library"
          icon={<LibraryBooksIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNavbar;
