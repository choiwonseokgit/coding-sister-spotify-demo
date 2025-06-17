import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SimplifiedAlbum } from "../../../models/album";

interface AlbumCardProps {
  album: SimplifiedAlbum;
}

const AlbumCardContainer = styled(Box)({
  width: 160,
  padding: 8,
  borderRadius: 8,
  transition: "transform 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const AlbumImage = styled("img")({
  width: "100%",
  borderRadius: 8,
  objectFit: "cover",
  aspectRatio: "1 / 1",
});

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <AlbumCardContainer>
      <AlbumImage src={album.images[1].url} alt={`${album.name} image`} />
      <Typography mt={1} fontWeight={600} noWrap>
        {album.name}
      </Typography>
      <Typography variant="body2" color="gray" noWrap>
        {album.artists.map((artist) => artist.name).join(", ")}
      </Typography>
    </AlbumCardContainer>
  );
};

export default AlbumCard;
