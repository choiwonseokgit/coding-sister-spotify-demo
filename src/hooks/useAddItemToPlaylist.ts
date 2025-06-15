import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToPlaylist } from "../apis/playlistApi";
import { AddItemToPlaylistRequest } from "../models/playlist";

const useAddItemToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddItemToPlaylistRequest) => addItemToPlaylist(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playtlist-detail", params.playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items"],
      });
    },
  });
};

export default useAddItemToPlaylist;
