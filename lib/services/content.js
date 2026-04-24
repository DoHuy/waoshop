import { apiRequest } from '../api-client';

export const contentService = {
  getBanners: () => {
    return apiRequest('/banners', {
      method: 'GET',
      next: { revalidate: 86400, tags: ['banners'] }
    });
  },

  getSliders: () => {
    return apiRequest('/slider-items', {
      method: 'GET',
      next: { revalidate: 86400, tags: ['sliders'] }
    });
  },

  getVideoBanner: () => {
    return apiRequest('/video-banner', {
      method: 'GET',
      next: { revalidate: 86400, tags: ['video-banner'] }
    });
  },

  getSocialVideos: () => {
    return apiRequest('/social-product-videos', {
      method: 'GET',
      next: { revalidate: 3600, tags: ['social-videos'] }
    });
  },

  getShopInfo: () => {
    return apiRequest('/shop', {
      method: 'GET',
    //   next: { revalidate: 600, tags: ['shop-info'] }
    caches: 'no-store'
    });
  },

  getBlogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(query ? `/blogs?${query}` : '/blogs', {
      method: 'GET',
      next: { revalidate: 600, tags: ['blogs'] }
    });
  },

  getBlogBySlug: (slug) => {
    return apiRequest(`/blogs/${slug}`, {
      method: 'GET',
      next: { revalidate: 3600, tags: [`blog-${slug}`] }
    });
  }
};