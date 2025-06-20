import { useInView } from "react-intersection-observer";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { useParams } from "react-router";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap", // 줄바꿈 가능하게
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
    padding: theme.spacing(1),
    flex: 1,
    minWidth: "100px",
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
  width: "40px",
  height: "40px",
  objectFit: "cover",
});

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const { id: playlist_id } = useParams();
  const { mutate: addItemToPlaylistMutate } = useAddItemToPlaylist();
  const [ref, inView] = useInView();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddButtonClick = (trackId: string) => {
    if (playlist_id) {
      addItemToPlaylistMutate({ playlist_id, track_id: trackId });
    }
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      <TableBody sx={{ width: "100%" }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            {/* Left: Album Image + Title + Artist */}
            <TableCell sx={{ flex: 3 }}>
              <Box display="flex" alignItems="center">
                <AlbumImage src={track.album?.images[0].url} />
                <Box>
                  <Typography fontWeight={700} fontSize={isMobile ? 14 : 16}>
                    {track.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontSize={isMobile ? 12 : 14}
                  >
                    {track.artists ? track.artists[0].name : "Unknown Artist"}
                  </Typography>
                </Box>
              </Box>
            </TableCell>

            {/* Middle: Album Name (숨김 처리 가능) */}
            {!isMobile && (
              <TableCell sx={{ flex: 2 }}>{track.album?.name}</TableCell>
            )}

            {/* Right: Add Button */}
            <TableCell
              sx={{
                flex: "0 0 auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size={isMobile ? "small" : "medium"}
                onClick={() => handleAddButtonClick(track.id)}
              >
                Add
              </Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;
