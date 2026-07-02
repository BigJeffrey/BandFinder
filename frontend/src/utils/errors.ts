import axios from 'axios';
import type { ApiErrorResponse } from '../types/api';

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const details = error.response?.data.details;
    if (details?.length) {
      return details.map((item) => item.message).join(' ');
    }

    return error.response?.data.error ?? error.message;
  }

  if (error instanceof Error) return error.message;

  return 'Wystąpił nieoczekiwany błąd.';
};
