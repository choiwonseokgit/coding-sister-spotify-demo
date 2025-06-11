import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import {
  ExternalUrls,
  Followers,
  Image,
  Owner,
  Restrictions,
} from "./commonTypes";
import { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_url?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export interface Playlist extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_url?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

// export interface Track {
//   album: SimplifiedAlbum;
//   artist: Artist;
//   available_markets: string[];
//   disc_number: number;
//   duration_ms: number;
//   explicit: boolean;
//   external_ids: {
//     isrc: string;
//     ean: string;
//     upc: string;
//   };
//   external_url: ExternalUrls;
//   href: string;
//   id: string;
//   is_playable: boolean;
//   linked_from: {};
//   restriction: {
//     reason: string;
//   };
//   name: string;
//   popularity: string;
//   preview_url: string | null;
//   track_number: number;
//   type: "track";
//   uri: string;
//   is_local: string;
// }

// export interface Episode {
//   description: string;
//   html_description: string;
//   explicit: boolean;
//   external_urls: ExternalUrls;
//   href: string;
//   id: string;
//   images: Image[];
//   is_externally_hosted: boolean;
//   is_playable: boolean;
//   name: string;
//   release_date: string;
//   release_date_precision: string;
//   type: "eposode";
//   uri: string;
//   resume_point: {
//     fully_played?: boolean;
//     resume_position_ms?: number;
//   };
//   restriction: Restrictions;
//   show: Show;
// }

export interface Show {
  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  };
  description: string;
  explicit: boolean;
  html_description: string;
  external_urls: string;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  language: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episode: number;
}
