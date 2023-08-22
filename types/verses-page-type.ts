import { VersesType } from "./verses-type";

export type VersesPage = {
  verses: VersesType[];
  pagination: {
    current_page: number;
    ayahs: number;
    next_page: number | null;
    total_pages: number;
  };
};
