export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};
