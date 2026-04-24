import { apiRequest } from '../api-client';

export const categoryService = {
  getAll: () => {
    return apiRequest('/categories', {
      method: 'GET',
      next: { revalidate: 86400, tags: ['categories'] }
    });
  }
};