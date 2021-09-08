import axios from "axios";

const handleLogin = (data) => {
  console.log("logging in");
  //login logic goes here
  axios
    .post(process.env.REACT_APP_SERVER_URL + "/login", data)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      window.location.replace(window.location.pathname);
    })
    .catch((err) => {
      alert(err);
    });
};

export default handleLogin;
