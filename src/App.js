import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { tokenHeader } from "./services/HeaderService";
import axios from "axios";
import PropertyList from "./components/Buying/PropertyList/PropertyList";
import PropertyDetail from "./components/Buying/PropertyDetail/PropertyDetail";

function App() {
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

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

  return (
    <div className="App">
      <Router>
        <Navbar
          user={user}
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
          signupModalOpen={signupModalOpen}
          setSignupModalOpen={setSignupModalOpen}
        />
        <Switch>
          <Route exact path="/">
            <PropertyList />
          </Route>
          <Route exact path="/ad">
            <PropertyDetail setLoginModalOpen={setLoginModalOpen} />
          </Route>
        </Switch>
        {/* <Route path="/myprofile">
          <MyProfileCard></MyProfileCard>
        </Route>
        <Route path="/adform">
          <AdForm></AdForm>
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
