import { format } from "date-fns";
import { Track } from "../../../models/track";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AlbumListPopup from "./AlbumListPopup";

interface SongCardProps {
  song: Track;
}

const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  backgroundColor: "#121212",
  borderBottom: "1px solid #2c2c2c",
  color: "#ffffff",
  position: "relative", // for absolute children
  "&:hover": {
    backgroundColor: "#1e1e1e",
    ".add-button": {
      opacity: 1,
    },
  },
}));

const AlbumImage = styled("img")({
  width: 50,
  height: 50,
  borderRadius: 4,
  marginRight: 16,
});

const InfoContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const SongTitle = styled(Typography)({
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#ffffff",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const ArtistName = styled(Typography)({
  fontSize: "0.85rem",
  color: "#b3b3b3",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const DurationText = styled(Typography)({
  fontSize: "0.85rem",
  color: "#b3b3b3",
  marginLeft: "auto",
});

const AddButton = styled(IconButton)({
  position: "absolute",
  right: "30%",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
  color: "#fff",
  border: "1px solid white",
  borderRadius: "100%",
  width: "30px",
  height: "30px",
});

const SongCard = ({ song }: SongCardProps) => {
  const isLogin = !!localStorage.getItem("access_token");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <CardContainer>
      <AlbumImage
        src={song.album.images[2]?.url ?? ""}
        alt={`${song.name} image`}
      />
      <InfoContainer>
        <SongTitle>{song.name}</SongTitle>
        <ArtistName>{song.artists[0].name}</ArtistName>
      </InfoContainer>
      {isLogin && (
        <AddButton className="add-button" onClick={handleAddClick}>
          <AddIcon />
        </AddButton>
      )}
      <DurationText>{format(new Date(song.duration_ms), "mm:ss")}</DurationText>
      <AlbumListPopup
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        trackId={song.id}
      />
    </CardContainer>
  );
};

export default SongCard;
