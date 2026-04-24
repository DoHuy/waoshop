import { apiRequest } from '../api-client';

export const productService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/products?${query}` : '/products';
    return apiRequest(endpoint, {
      method: 'GET',
      next: { revalidate: 60, tags: ['products'] }
    });
  },

  getBySlug: (slug) => {
    return apiRequest(`/products/${slug}`, {
      method: 'GET',
    //   next: { revalidate: 3600, tags: [`product-${slug}`] }
    caches: 'no-store'
    });
  },    

  getFeatured: () => {
    return apiRequest('/featured-products', {
      method: 'GET',
    //   next: { revalidate: 3600, tags: ['featured-products'] }
    caches: 'no-store'
    });
  },

  getNew: () => {
    return apiRequest('/new-products', {
      method: 'GET',
      next: { revalidate: 3600, tags: ['new-products'] }
    });
  },

  getByCategory: (categorySlug, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/categories/${categorySlug}/products?${query}` : `/categories/${categorySlug}/products`;
    return apiRequest(endpoint, {
      method: 'GET',
      next: { revalidate: 3600, tags: [`category-products-${categorySlug}`] }
    });
  },

  getRelated: (relatedProductId) => {
    return apiRequest(`/products/${relatedProductId}/related-products`, {
      method: 'GET',
    //   next: { revalidate: 3600, tags: ['related-products'] }
    caches: 'no-store'
    });
  },

  getFrequentlyBought: (productId) => {
    return apiRequest(`/products/${productId}/frequently-bought`, {
      method: 'GET',
    //   next: { revalidate: 86400, tags: [`frequently-bought-${productId}`] }
    caches: 'no-store'
    });
  },

  getInventory: (productId) => {
    return apiRequest(`/products/${productId}/inventory`, {
      method: 'GET',
      cache: 'no-store' 
    });
  }
};