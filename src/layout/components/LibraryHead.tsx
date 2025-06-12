import { Button, colors, styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px",
});

const StyledButton = styled(Button)({
  minWidth: "auto",
});

const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
  color: colors.green[500],
}));

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "나의 플레이 리스트" });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <Container>
      <BookmarkIcon />
      <Typography variant="h2" fontWeight={700}>
        Your Library
      </Typography>
      <StyledButton>
        <StyledAddIcon onClick={handleCreatePlaylist} />
      </StyledButton>
    </Container>
  );
};

export default LibraryHead;
