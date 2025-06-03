import { Button, colors, styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

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
  return (
    <Container>
      <BookmarkIcon />
      <Typography variant="h2" fontWeight={700}>
        Your Library
      </Typography>
      <StyledButton>
        <StyledAddIcon />
      </StyledButton>
    </Container>
  );
};

export default LibraryHead;
