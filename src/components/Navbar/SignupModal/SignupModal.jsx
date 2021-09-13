import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import "./SignupModal.css";
import ImageInput from "./ImageInput/ImageInput";
import UploadImage from "../../../services/ImageUploadService";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  signupPaper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const defaultPicURL =
  "https://www.hrzone.com/sites/all/themes/pp/img/default-user.png";

const SignupModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const {
    signupModalOpen,
    setSignupModalOpen,
    handleSignup,
    switchModal,
    setLoading,
  } = props;

  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [Admin, setAdmin] = useState(false);
  const [Image, setImage] = useState(null);

  const [errors, setErrors] = useState({
    FullNameError: "",
    EmailError: "",
    PhoneError: "",
    PasswordError: "",
    RePasswordError: "",
  });

  useEffect(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRePassword("");
    setAdmin(false);
    setImage(null);
    setErrors({
      FullNameError: "",
      EmailError: "",
      PhoneError: "",
      PasswordError: "",
      RePasswordError: "",
    });
  }, [signupModalOpen]);

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const ValidatePassword = (password) => {
    if (
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        password
      )
    ) {
      return true;
    }
    return false;
  };

  const ValidatePhone = (phone) => {
    if (
      phone[0] == 6 ||
      phone[0] == 7 ||
      phone[0] == 8 ||
      (phone[0] == 9 && /^\d{10}$/.test(phone))
    ) {
      return true;
    }
    return false;
  };

  const validateOnce = () => {
    setErrors({
      FullNameError: FullName.length == 0 ? "Required" : errors.FullNameError,
      EmailError: Email.length == 0 ? "Required" : errors.EmailError,
      PhoneError: Phone.length == 0 ? "Required" : errors.PhoneError,
      PasswordError: Password.length == 0 ? "Required" : errors.PasswordError,
      RePasswordError:
        RePassword.length == 0 ? "Required" : errors.RePasswordError,
    });
  };

  const validate = () => {
    setErrors({
      FullNameError:
        0 < FullName.length && FullName.length < 4
          ? "Name should be at least 4 characters"
          : "",
      PhoneError:
        0 < Phone.length && !ValidatePhone(Phone)
          ? "Phone no. should be valid"
          : "",
      EmailError:
        0 < Email.length && !ValidateEmail(Email)
          ? "Email should be valid"
          : "",
      PasswordError:
        0 < Password.length && !ValidatePassword(Password)
          ? "Password should have 1 upper, 1 lower, 1 numeric and 1 special character"
          : "",
      RePasswordError:
        0 < RePassword.length && RePassword != Password
          ? "Passwords don't match"
          : "",
    });
  };

  const formValid = () => {
    return !Object.values(errors)
      .map((el) => {
        return Boolean(el);
      })
      .includes(true);
  };

  useEffect(() => {
    if (FullName || Phone || Email || Password || RePassword) validate();
  }, [FullName, Phone, Email, Password, RePassword]);

  const body = (
    <div style={modalStyle} className={classes.signupPaper + " signup-paper"}>
      <h2 id="simple-modal-title">Create a new account</h2>
      <p className="modal-subtitle">Enter your details</p>
      <div id="simple-modal-description">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "25px",
            }}
          >
            <div className="input-label">Full name</div>
            <Input
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name..."
              className={errors.FullNameError ? "error" : ""}
            />
            {errors.FullNameError ? (
              <span class="help-block">{errors.FullNameError}</span>
            ) : null}

            <div className="input-label">Email</div>
            <Input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ID..."
              className={errors.EmailError ? "error" : ""}
            />
            {errors.EmailError ? (
              <span class="help-block">{errors.EmailError}</span>
            ) : null}
            <div className="input-label">Phone</div>
            <Input
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter valid phone number..."
              className={errors.PhoneError ? "error" : ""}
            />
            {errors.PhoneError ? (
              <span class="help-block">{errors.PhoneError}</span>
            ) : null}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "max-content",
                marginTop: "10px",
              }}
            >
              <div className="input-label">Admin</div>
              <Checkbox
                checked={Admin}
                inputProps={{ "aria-label": "Checkbox A" }}
                onChange={(e) => {
                  setAdmin(e.target.checked);
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div className="input-label">Password</div>
            <Input
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type="Password"
              placeholder="Enter a Password..."
              className={errors.PasswordError ? "error" : ""}
            />
            {errors.PasswordError ? (
              <span class="help-block">{errors.PasswordError}</span>
            ) : null}
            <div className="input-label">Confirm Password</div>
            <Input
              value={RePassword}
              onChange={(e) => setRePassword(e.target.value)}
              type="Password"
              placeholder="Retype your Password..."
              className={errors.RePasswordError ? "error" : ""}
            />
            {errors.RePasswordError ? (
              <span class="help-block">{errors.RePasswordError}</span>
            ) : null}
            <div className="input-label">Profile image</div>
            <ImageInput
              Image={Image}
              setImage={setImage}
              placeholder={defaultPicURL}
            />
          </div>
        </div>
      </div>
      <div className="loginform__buttons__container">
        <Button
          onClick={() => {
            switchModal();
          }}
        >
          Login Instead
        </Button>
        <Button
          onClick={async () => {
            validate();
            validateOnce();
            if (formValid()) {
              let imageURL = defaultPicURL;
              try {
                imageURL =
                  Image == null
                    ? defaultPicURL
                    : await UploadImage(Image, "profile");
              } catch (err) {
                console.log(err);
                imageURL = defaultPicURL;
              }

              handleSignup(
                {
                  fullname: FullName,
                  email: Email,
                  mobile: Phone,
                  password: Password,
                  role: Admin ? "admin" : "user",
                  is_subscribed: false,
                  profile_picture: imageURL,
                },
                setLoading,
                setSignupModalOpen
              );
            }
          }}
        >
          Create
        </Button>
      </div>

      {/* <SignupModal open={signupModalOpen} /> */}
    </div>
  );

  return (
    <Modal
      open={signupModalOpen}
      onClose={() => {
        setSignupModalOpen(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default SignupModal;
