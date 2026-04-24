// lib/api-client.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// ============================================================================
// 1. HTTP Client (REST API)
// ============================================================================
export async function apiRequest(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {  
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (response.status === 204) return null;

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return data;
    }

    throw new ApiError(
      data.msg || 'Server-side error occurred', 
      response.status, 
      data
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    
    throw new ApiError('Network connection error', 500, null);
  }
}

export function initWebsocket(endpoint, options = {}) {
  const { token, onOpen, onMessage, onError, onClose } = options;

  let wsBaseUrl = process.env.NEXT_PUBLIC_WS_URL;
  
  if (!wsBaseUrl) {
    try {
      const url = new URL(BASE_URL || window.location.origin);
      const protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
      wsBaseUrl = `${protocol}//${url.host}`; 
    } catch (e) {
      wsBaseUrl = 'ws://localhost:8888'; 
    }
  }

  const wsUrl = new URL(`${wsBaseUrl}${endpoint}`);
  if (token) {
    wsUrl.searchParams.append('token', token);
  }

  const ws = new WebSocket(wsUrl.toString());

  if (onOpen) ws.onopen = onOpen;
  if (onMessage) ws.onmessage = onMessage;
  if (onError) ws.onerror = onError;
  if (onClose) ws.onclose = onClose;

  return ws;
}