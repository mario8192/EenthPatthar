import axios from "axios";

const handleLogin = (data, setLoading, setLoginModalOpen) => {
  console.log("logging in");
  //login logic goes here
  setLoading(true);
  axios
    .post(process.env.REACT_APP_SERVER_URL + "/login", data)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      setLoginModalOpen && setLoginModalOpen(false);
      window.location.reload();
    })
    .catch((err) => {
      setLoading(false);
      alert(err.response.data.error);
    });
};

export default handleLogin;
