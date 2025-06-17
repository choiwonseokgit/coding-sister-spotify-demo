import { Box, Typography } from "@mui/material";
import { Artist } from "../../../models/artist";
import ArtistCard from "./ArtistCard";

interface ArtistBoxProps {
  artists?: Artist[];
}

const ArtistBox = ({ artists }: ArtistBoxProps) => {
  const isNoResult = !artists || artists.length === 0;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Artists
      </Typography>

      <Box display="flex" gap={1}>
        {isNoResult && <Typography>검색 결과가 없습니다.</Typography>}
        {isNoResult ||
          artists.slice(0, 6).map((artist) => <ArtistCard artist={artist} />)}
      </Box>
    </Box>
  );
};

export default ArtistBox;
