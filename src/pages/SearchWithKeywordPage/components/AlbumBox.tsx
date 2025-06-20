import { Box, Typography } from "@mui/material";
import { SimplifiedAlbum } from "../../../models/album";
import AlbumCard from "./AlbumCard";

interface AlbumBoxProps {
  albums?: SimplifiedAlbum[];
}

const AlbumBox = ({ albums }: AlbumBoxProps) => {
  const isNoResult = !albums || albums.length === 0;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Albums
      </Typography>
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
        {isNoResult && <Typography>검색 결과가 없습니다.</Typography>}
        {isNoResult ||
          albums
            .slice(0, 6)
            .map((album) => <AlbumCard album={album} key={album.name} />)}
      </Box>
    </Box>
  );
};

export default AlbumBox;
