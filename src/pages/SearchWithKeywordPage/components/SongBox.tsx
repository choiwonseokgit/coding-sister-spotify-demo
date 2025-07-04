import { Box, Typography } from "@mui/material";
import { Track } from "../../../models/track";
import SongCard from "./SongCard";

interface SongBoxProps {
  songs?: Track[];
}

const SongBox = ({ songs }: SongBoxProps) => {
  const isNoResult = !songs || songs.length === 0;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Songs
      </Typography>
      <Box>
        {isNoResult && <Typography>검색 결과가 없습니다.</Typography>}
        {isNoResult ||
          songs
            .slice(0, 4)
            .map((song) => <SongCard song={song} key={song.name} />)}
      </Box>
    </Box>
  );
};

export default SongBox;
