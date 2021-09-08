const logout = (history) => {
  //logout logic goes here
  localStorage.removeItem("token");
  window.location.replace("/");
};

export default logout;
