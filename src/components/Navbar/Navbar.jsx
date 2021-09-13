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
    setLoading,
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
          <h2 className="navbar__appname" style={{ textDecoration: "none" }}>
            EenthPatthar.com
          </h2>
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
              <div className="dropdown">
                <button
                  type="button"
                  className="userActions"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div
                    className="profile__image"
                    style={{
                      backgroundImage: "url(" + user.profile_picture + ")",
                    }}
                  ></div>
                  <div className="profile__name">{user.email}</div>
                </button>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/myprofile">
                    My Profile
                  </a>
                  <a className="dropdown-item" href="/contacted">
                    Contacted
                  </a>
                  <a className="dropdown-item" href="/offers">
                    Offers
                  </a>
                  {user && user.role == "admin" ? (
                    <a
                      class="dropdown-item"
                      href="/admin_main/admin-properties"
                    >
                      Admin panel
                    </a>
                  ) : null}
                </div>
              </div>

              <Link to="/myprofile" className="userActions"></Link>

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
            setLoading={setLoading}
          />
          <SignupModal
            signupModalOpen={signupModalOpen}
            setSignupModalOpen={setSignupModalOpen}
            handleSignup={handleSignup}
            switchModal={switchModal}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
