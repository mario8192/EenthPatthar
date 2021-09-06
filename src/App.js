import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./services/History";
import { tokenHeader } from "./services/HeaderService";
import axios from "axios";
import PropertyList from "./components/Buying/PropertyList/PropertyList";
import PropertyDetail from "./components/Buying/PropertyDetail/PropertyDetail";

function App() {
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const data = axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + "/myProfile",
        headers: tokenHeader(),
      })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setUser(null);
  }, []);

  const logout = () => {
    //logout logic goes here
    localStorage.removeItem("token");
    // history.push("/");
    window.location.reload();
  };

  const handleLogin = (data) => {
    console.log("logging in");
    //login logic goes here
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSignup = (data) => {
    console.log("signing up");
    //signup logic goes here
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/register", data)
      .then((res) => {
        console.log(res);
      })
      .err((err) => {
        alert(err);
      });
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        logout={logout}
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        signupModalOpen={signupModalOpen}
        setSignupModalOpen={setSignupModalOpen}
      />
      <Router>
        <Switch>
          <Route exact path="/">
            <PropertyList />
          </Route>
          <Route path="/ad">
            <PropertyDetail setLoginModalOpen={setLoginModalOpen} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
