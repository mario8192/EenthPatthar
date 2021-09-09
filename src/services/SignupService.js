import axios from "axios";

const handleSignup = (data) => {
  console.log("signing up");
  //signup logic goes here
  console.log(data);
  let res;
  axios
    .post(process.env.REACT_APP_SERVER_URL + "/register", data)
    .then((res) => {
      console.log(res);
      alert(res.data.message);
    })
    .catch((err) => {
      alert(res);
    });
};

export default handleSignup;
