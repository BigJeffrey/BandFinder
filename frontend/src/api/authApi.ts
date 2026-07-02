import { api } from './axios';
import type { AuthResponse, LoginInput, RegisterInput } from '../types/auth';

export const authApi = {
  login: async (payload: LoginInput) => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  register: async (payload: RegisterInput) => {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },
};
