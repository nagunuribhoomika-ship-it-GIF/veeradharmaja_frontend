import { getAuthHeaders } from "./auth";

const rawBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const getApiUrl = (path = "") => {
  if (!path) return API_BASE_URL;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}/${String(path).replace(/^\/+/, "")}`;
};

export const getFileUrl = (path = "") => {
  if (!path) return "";

  return getApiUrl(path);
};

export const apiFetch = (path, options = {}) => {
  const { auth = false, headers = {}, ...restOptions } = options;

  return fetch(getApiUrl(path), {
    ...restOptions,
    headers: {
      ...(auth ? getAuthHeaders() : {}),
      ...headers
    }
  });
};

const fetchJson = async (path, options = {}) => {
  const response = await apiFetch(path, options);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || "API request failed");
    error.response = response;
    error.data = data;
    throw error;
  }

  return data;
};

export const loginAdmin = (credentials) =>
  fetchJson("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

export const getAdminEnquiries = () =>
  fetchJson("/api/admin/enquiries", { auth: true });

export const submitContactEnquiry = (payload) =>
  fetchJson("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

export const getEvents = () => fetchJson("/api/events");

export const createEvent = (payload) =>
  fetchJson("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    auth: true,
    body: JSON.stringify(payload)
  });

export const deleteEvent = (eventId) =>
  apiFetch(`/api/events/${eventId}`, {
    method: "DELETE",
    auth: true
  });

export const getEventBySlug = (slug) =>
  fetchJson(`/api/events/slug/${slug}`);

export const getServices = () => fetchJson("/api/services");

export const getServiceById = (serviceId) =>
  fetchJson(`/api/services/${serviceId}`);

export const getEventMedia = async (eventId) =>
  fetchJson(`/api/media/event/${eventId}`);

export const uploadEventMedia = (eventId, file, options = {}) => {
  const formData = new FormData();
  formData.append("file", file);

  const searchParams = new URLSearchParams();
  if (options.cover) {
    searchParams.set("cover", "true");
  }

  const query = searchParams.toString();
  const path = query
    ? `/api/media/upload/${eventId}?${query}`
    : `/api/media/upload/${eventId}`;

  return apiFetch(path, {
    method: "POST",
    auth: true,
    body: formData
  });
};

export const deleteMedia = (mediaId) =>
  apiFetch(`/api/media/${mediaId}`, {
    method: "DELETE",
    auth: true
  });
