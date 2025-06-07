import { Avatar, Box, IconButton, Menu, MenuItem, styled } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useState } from "react";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const logoutFn = () => {
    localStorage.removeItem("access_token");
    setAnchorEl(null); // 메뉴 닫기
    window.location.reload();
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {userProfile ? (
        <ProfileContainer>
          <IconButton onClick={handleAvatarClick} size="small">
            <Avatar
              src={userProfile.images[0]?.url}
              alt={userProfile.display_name}
            />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => setAnchorEl(null)}
            keepMounted
          >
            <ProfileMenuItem onClick={logoutFn}>Log out</ProfileMenuItem>
          </ProfileMenu>
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
