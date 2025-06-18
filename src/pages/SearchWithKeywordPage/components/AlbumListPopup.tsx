import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Menu,
} from "@mui/material";
import { useEffect, useRef } from "react";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";

interface AlbumListPopupProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  trackId: string;
}

const AlbumListPopup = ({
  anchorEl,
  onClose,
  trackId,
}: AlbumListPopupProps) => {
  const open = Boolean(anchorEl);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetCurrentUserPlaylists({ limit: 15, offset: 0 });
  const { mutate: addItemToPlaylistMutate } = useAddItemToPlaylist();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{ style: { maxHeight: 300, width: 250 } }}
    >
      <List dense>
        {isLoading ? (
          <ListItem>
            <CircularProgress size={20} />
          </ListItem>
        ) : (
          data?.pages.flatMap((page) =>
            page.items.map((playlist) => (
              <ListItem
                key={playlist.id}
                button
                onClick={() => {
                  if (playlist.id)
                    addItemToPlaylistMutate({
                      playlist_id: playlist.id,
                      track_id: trackId,
                    });
                  onClose();
                }}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={playlist.name} />
              </ListItem>
            ))
          )
        )}
        <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
      </List>
    </Menu>
  );
};

export default AlbumListPopup;
