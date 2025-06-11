import { styled, TableCell, TableRow } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import { format } from "date-fns";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
  idx: number;
}

const DesktopPlaylistItem = ({ item, idx }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  if (isEpisode(item.track)) return;

  return (
    <StyledTableRow>
      <TableCell>{idx}</TableCell>
      <TableCell>{item.track.name ?? "no name"}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album.name}
      </TableCell>
      <TableCell>
        {item.added_at
          ? format(new Date(item.added_at), "yyyy-MM-dd")
          : "Unknown"}
      </TableCell>
      <TableCell>
        {format(new Date(item.track.duration_ms), "mm:ss") || "Unknown"}
      </TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
