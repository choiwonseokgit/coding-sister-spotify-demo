// components/MobilePlaylistItem.tsx
import { Box, Typography, styled } from "@mui/material";

const AlbumImage = styled("img")({
  width: 48,
  height: 48,
  borderRadius: 6,
  objectFit: "cover",
  marginRight: 12,
});

const MobilePlaylistItem = ({ item }: { item: any }) => {
  const track = item.track;

  return (
    <Box display="flex" alignItems="center" padding={1}>
      <AlbumImage src={track?.album?.images[0]?.url} alt={track?.name} />
      <Box>
        <Typography fontWeight={700} fontSize={14} sx={{ color: "#1db954" }}>
          {track?.name}
        </Typography>
        <Typography fontSize={12} color="text.secondary">
          {track?.artists?.[0]?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobilePlaylistItem;
