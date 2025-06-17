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
      <Box display="flex" gap={1}>
        {isNoResult && <Typography>검색 결과가 없습니다.</Typography>}
        {isNoResult ||
          albums.slice(0, 6).map((album) => <AlbumCard album={album} />)}
      </Box>
    </Box>
  );
};

export default AlbumBox;
