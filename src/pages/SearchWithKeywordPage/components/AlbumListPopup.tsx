import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Menu,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../../common/components/LoginButton";

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
  const { data: user } = useGetCurrentUserProfile();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetCurrentUserPlaylists({ limit: 15, offset: 0 });
  const { mutate: addItemToPlaylistMutate } = useAddItemToPlaylist();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log("user", user);

  if (!user)
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Typography variant="h6" my="10px">
          로그인을 해주세요
        </Typography>
      </Menu>
    );

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
