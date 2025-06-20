import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToPlaylist } from "../apis/playlistApi";
import { AddItemToPlaylistRequest } from "../models/playlist";
import toast from "react-hot-toast";

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
      toast.success("플레이리스트에 추가되었습니다.");
    },
  });
};

export default useAddItemToPlaylist;
