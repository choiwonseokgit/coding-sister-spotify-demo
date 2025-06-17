import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Artist } from "../../../models/artist";

interface ArtistCardProps {
  artist: Artist;
}

const CardContainer = styled(Box)(({ theme }) => ({
  width: 160,
  borderRadius: 16,
  padding: 8,
  backgroundColor: "#121212",
  transition: "all 0.3s ease",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#2a2a2a",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
  },
  "&:hover .play-button": {
    opacity: 1,
    transform: "scale(1)",
  },
}));

const ArtistImage = styled("img")({
  width: "100%",
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
});

const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#1db954",
  color: "#000",
  position: "absolute",
  bottom: 16,
  right: 16,
  zIndex: 10,
  opacity: 0,
  transform: "scale(0.9)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#1ed760",
  },
}));

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <CardContainer>
      <Box position="relative">
        <ArtistImage src={artist.images[1].url} alt={artist.name} />
        <PlayButton className="play-button">
          <PlayArrowIcon />
        </PlayButton>
      </Box>
      <Typography mt={1} fontWeight={600}>
        {artist.name}
      </Typography>
      <Typography variant="body2" color="gray">
        Artist
      </Typography>
    </CardContainer>
  );
};

export default ArtistCard;
