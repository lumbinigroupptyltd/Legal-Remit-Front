export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("modalShown");
};
