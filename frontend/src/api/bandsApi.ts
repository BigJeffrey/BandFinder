import { api } from './axios';
import type { Band, BandFilters, BandInput, PaginatedBands } from '../types/band';

const cleanParams = (filters: BandFilters) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined),
  );

export const bandsApi = {
  list: async (filters: BandFilters) => {
    const { data } = await api.get<PaginatedBands>('/bands', { params: cleanParams(filters) });
    return data;
  },
  getById: async (id: number) => {
    const { data } = await api.get<Band>(`/bands/${id}`);
    return data;
  },
  create: async (payload: BandInput) => {
    const { data } = await api.post<Band>('/bands', payload);
    return data;
  },
  update: async (id: number, payload: BandInput) => {
    const { data } = await api.put<Band>(`/bands/${id}`, payload);
    return data;
  },
  remove: async (id: number) => {
    await api.delete(`/bands/${id}`);
  },
};
