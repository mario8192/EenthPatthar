import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { tokenHeader } from "./services/HeaderService";
import axios from "axios";
import PropertyList from "./components/Buying/PropertyList/PropertyList";
import PropertyDetail from "./components/Buying/PropertyDetail/PropertyDetail";
import Contacted from "./components/UserView/Contacted/Contacted";
import Offers from "./components/UserView/Offers/Offers";
import MyProfileCard from "./components/MyProfileCard/MyProfileCard";
import AdForm from "./components/Adform/AdForm";
import UserPage from "./components/UserView/UserPage/UserPage";
import Admin_main from "./components/Admin/Admin_main";
import Loader from "./components/Loader/Loader";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

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

  

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <div className="App">
      <Router>
        <Navbar
          user={user}
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
          signupModalOpen={signupModalOpen}
          setSignupModalOpen={setSignupModalOpen}
          setLoading={setLoading}
        />
        <Loader isLoading={isLoading} />
        <Switch>
          <Route exact path="/">
            <PropertyList />
          </Route>
          <Route exact path="/ad">
            <PropertyDetail user={user} setLoginModalOpen={setLoginModalOpen} />
          </Route>
          {user && (
            <Route path="/admin_main">
              {user.role === "admin" ? (
                <Admin_main user={user}></Admin_main>
              ) : (
                <div>
                  <h2>Admin Access Needed</h2>
                </div>
              )}
            </Route>
          )}
          {/* {user && <Route path='/admin-properties'>
            {user.role === 'admin' ? <AdminPanel 
            user={user}
            /> : <div><h2>Admin Access Needed</h2></div>}
          </Route>}
          {user && <Route path='/admin-users'>
            {user.role === 'admin' ? <AdminUserPanel 
            user={user}
            /> : <div><h2>Admin Access Needed</h2></div>}
          </Route>} */}
          <Route path="/contacted">{user && <Contacted user={user} />}</Route>
          <Route path="/offers">
            <Offers user={user} />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/myprofile">
            <MyProfileCard user={user}></MyProfileCard>
          </Route>
          <Route path="/adform">
            <AdForm></AdForm>
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
