import { Image } from "./commonTypes";

export interface GetCategoriesResponse {
  categories: {
    href: string;
    limit: string;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Category[];
  };
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}
