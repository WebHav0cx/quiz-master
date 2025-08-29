import { authAPI } from "./api";

// Login with provider (e.g. "local", "google")
export const login = async (provider, credentials) => {
  const { data } = await authAPI.login(provider, credentials);

  // store token so interceptors can use it
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data; // { token, user }
};

export const logout = async () => {
  try {
    await authAPI.logout();
  } finally {
    localStorage.removeItem("token");
  }
};

export const getProfile = async () => {
  const { data } = await authAPI.getProfile();
  return data; // { id, name, email, ... }
};
