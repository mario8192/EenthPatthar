import React, { Component, Fragment, useState } from "react";
import LoginModal from "./LoginModal/LoginModal";
import SignupModal from "./SignupModal/SignupModal";
import profilePlaceholder from "./profile-placeholder.png";
import "./Navbar.css";

const Navbar = (props) => {
  const profileImage =
    "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";
  const { user, logout, handleLogin, handleSignup } = props;

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  // const [];

  const loginClickAction = () => {
    setLoginModalOpen(true);
  };
  const signupClickAction = () => {
    setSignupModalOpen(true);
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand__icon" />
        <h2 className="navbar__appname">EenthPatthar.com</h2>
        <div className="userActions">
          {!user ? (
            <Fragment>
              <div className="login__button" onClick={loginClickAction}>
                Login
              </div>
              <div className="login__button" onClick={signupClickAction}>
                Signup
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div
                className="profile__image"
                style={{
                  backgroundImage: "url(" + profileImage + ")",
                }}
              ></div>
              <div className="profile__name">{user.displayName}</div>
              <div className="login__button" onClick={logout}>
                Logout
              </div>
            </Fragment>
          )}

          <LoginModal
            loginModalOpen={loginModalOpen}
            setLoginModalOpen={setLoginModalOpen}
            handleLogin={handleLogin}
          />
          <SignupModal
            signupModalOpen={signupModalOpen}
            setSignupModalOpen={setSignupModalOpen}
            handleSignup={handleSignup}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
