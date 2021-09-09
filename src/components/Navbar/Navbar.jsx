import React, { Component, Fragment } from "react";
import LoginModal from "./LoginModal/LoginModal";
import SignupModal from "./SignupModal/SignupModal";
import profilePlaceholder from "./profile-placeholder.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logout from "../../services/LogoutService";
import handleLogin from "../../services/LoginService";
import handleSignup from "../../services/SignupService";

const Navbar = (props) => {
  const profileImage =
    "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";
  const {
    user,
    loginModalOpen,
    setLoginModalOpen,
    signupModalOpen,
    setSignupModalOpen,
  } = props;

  const loginClickAction = () => {
    setLoginModalOpen(true);
  };
  const signupClickAction = () => {
    setSignupModalOpen(true);
  };

  const switchModal = () => {
    setSignupModalOpen(!signupModalOpen);
    setLoginModalOpen(!loginModalOpen);
  };

  return (
    <div className="navbar__main">
      <div className="navbar__container">
        <div className="navbar__brand__icon" />
        <Link to="/">
          <h2 className="navbar__appname">EenthPatthar.com</h2>
        </Link>
        <div className="userActions">
          {!user ? (
            <Fragment>
              <div className="login__button" onClick={loginClickAction}>
                Login
              </div>
              {/* <div className="login__button" onClick={signupClickAction}>
                Signup
              </div> */}
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/myprofile" className="userActions">
                <div
                  className="profile__image"
                  style={{
                    backgroundImage: "url(" + user.profile_picture + ")",
                  }}
                ></div>
                <div className="profile__name">{user.email}</div>
              </Link>
              <div className="login__button" onClick={logout}>
                Logout
              </div>
            </Fragment>
          )}

          <LoginModal
            loginModalOpen={loginModalOpen}
            setLoginModalOpen={setLoginModalOpen}
            handleLogin={handleLogin}
            switchModal={switchModal}
          />
          <SignupModal
            signupModalOpen={signupModalOpen}
            setSignupModalOpen={setSignupModalOpen}
            handleSignup={handleSignup}
            switchModal={switchModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
