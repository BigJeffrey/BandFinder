import type { User } from './auth';

export interface Band {
  id: number;
  name: string;
  city: string;
  genre: string;
  instrumentNeeded: string;
  description: string;
  contactEmail: string;
  createdAt: string;
  userId: number;
  user: User;
}

export type BandInput = Pick<
  Band,
  'name' | 'city' | 'genre' | 'instrumentNeeded' | 'description' | 'contactEmail'
>;

export interface BandFilters {
  search: string;
  city: string;
  genre: string;
  instrumentNeeded: string;
  page: number;
  limit: number;
}

export type BandSort = 'newest' | 'name-asc' | 'name-desc';

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedBands {
  data: Band[];
  pagination: Pagination;
}
