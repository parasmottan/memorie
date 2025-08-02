export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return !!user && JSON.parse(user)?.token;
};
