import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import history from "./services/History";
import { tokenHeader } from "./services/HeaderService";
import axios from "axios";
import PropertyList from "./components/Buying/PropertyList/PropertyList";
import PropertyDetail from "./components/Buying/PropertyDetail/PropertyDetail";
import AdminPanel from "./components/Admin/AdminPropertyPanel/AdminPropertyPanel";
import AdminUserPanel from "./components/Admin/AdminUserPanel/AdminUserPanel";
import Contacted from "./components/UserView/Contacted/Contacted";
import Offers from "./components/UserView/Offers/Offers";
import MyProfileCard from './components/MyProfileCard/MyProfileCard';
import AdForm from "./components/Adform/AdForm";

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

          {user.role === 'admin' ? <Route path='/admin-properties'>
            <AdminPanel 
            user={user}
            />
          </Route> : null}
          {user.role === 'admin' ? <Route path='/admin-users'>
            <AdminUserPanel 
            user={user}
            />
          </Route> : null}
          <Route path='/contacted'>
            {user &&<Contacted user={user}/>}
          </Route>
          <Route path='/offers'>
            <Offers user={user}/>
          </Route>
          <Route path="/myprofile">
            <MyProfileCard></MyProfileCard>
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
