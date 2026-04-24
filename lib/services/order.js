import { apiRequest } from '../api-client';

export const orderService = {
  create: (orderData) => {
    return apiRequest('/order/create', {
      method: 'POST',
      body: orderData,
      cache: 'no-store'
    });
  },

  capture: (requestData) => {
    return apiRequest('/order/capture', {
      method: 'POST',
      body: requestData,
      cache: 'no-store'
    });
  }
};

export const systemService = {
  ping: () => {
    return apiRequest('/ping', {
      method: 'GET',
      cache: 'no-store'
    });
  },

  getGuestToken: () => {
    return apiRequest('/guest-token', {
      method: 'GET',
      cache: 'no-store'
    });
  }
};