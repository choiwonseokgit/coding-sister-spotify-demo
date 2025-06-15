import {
  AddItemToPlaylistRequest,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });

    return response.data;
  } catch (err) {
    throw new Error("fail to fetch current user playlists");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });

    return response.data;
  } catch (err) {
    // throw new Error("fail to fetch playlist detail");
    throw err;
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });

    return response.data;
  } catch (err) {
    // throw new Error("fail to fetch playlist items");
    throw err;
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  const { name, playlistPublic, collaborative, description } = params;

  try {
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });

    return response.data;
  } catch (err) {
    throw new Error("fail to create playlist");
  }
};

export const addItemToPlaylist = async (paramas: AddItemToPlaylistRequest) => {
  try {
    const response = await api.post(
      `/playlists/${paramas.playlist_id}/tracks?uris=spotify:track:${paramas.track_id}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
