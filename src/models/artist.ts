import { ExternalUrls, Image } from "./commonTypes";

export interface Artist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: "artist";
  uri?: string;
  images: Image[];
}
