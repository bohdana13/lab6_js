import { ref } from "vue";

const isAuthenticated = ref(!!localStorage.getItem("access_token"));

export function useAuth() {
  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
