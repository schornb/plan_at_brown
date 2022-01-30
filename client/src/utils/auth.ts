export const handleLoginClick = () => {
  window.open(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, "_self");
};

export const handleLogoutClick = () => {
  window.open(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, "_self");
};
