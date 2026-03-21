const ADMIN_AUTH_EVENT = "admin-auth-changed";

export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const setAdminToken = (token) => {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
};

export const clearAdminToken = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
};

export const subscribeToAdminAuth = (callback) => {
  window.addEventListener(ADMIN_AUTH_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(ADMIN_AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};
