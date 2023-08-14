import { Verses } from "./verses-type";

export type VersesPage = {
  verses: Verses[];
  pagination: {
    current_page: number;
    ayahs: number;
    next_page: number | null;
    total_pages: number;
  };
};
