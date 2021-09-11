import axios from "axios";
import handleLogin from "./LoginService";

const handleSignup = (data, setLoading, setSignupModalOpen) => {
  console.log("signing up");
  //signup logic goes here
  console.log(data);
  setLoading(true);
  let res;
  axios
    .post(process.env.REACT_APP_SERVER_URL + "/register", data)
    .then((res) => {
      console.log(res);
      setLoading(false);
      setSignupModalOpen(false);
      // alert(res.data.message);
      handleLogin({ email: data.email, password: data.password }, setLoading);
    })
    .catch((err) => {
      setLoading(false);
      alert(err.response.data.error);
    });
};

export default handleSignup;
