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
      <Typography variant="h5" fontWeight={700} mb={1}>
        Artists
      </Typography>

      {isNoResult ? (
        <Typography>검색 결과가 없습니다.</Typography>
      ) : (
        <Box
          display="grid"
          gap={2}
          sx={{
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // 모바일: 2열
              sm: "repeat(3, 1fr)", // 태블릿 이상: 3열
              md: "repeat(4, 1fr)", // 더 크면 4열
            },
          }}
        >
          {artists.slice(0, 6).map((artist) => (
            <ArtistCard artist={artist} key={artist.name} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ArtistBox;
