import { apiRequest } from '../api-client';

export const interactionService = {
  getFaqs: (productId) => {
    return apiRequest(`/products/${productId}/faqs`, {
      method: 'GET',
      next: { revalidate: 86400, tags: [`faqs-${productId}`] }
    });
  },

  getReviews: (productId) => {
    return apiRequest(`/products/${productId}/reviews`, {
      method: 'GET',
    //   next: { revalidate: 60, tags: [`reviews-${productId}`] }
    caches: 'no-store'
    });
  },

  createReview: (reviewData) => {
    return apiRequest('/products/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
      cache: 'no-store' 
    });
  }
};