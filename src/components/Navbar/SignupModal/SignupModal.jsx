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
  paper: {
    position: "absolute",
    width: 300,
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

  useEffect(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRePassword("");
    setAdmin(false);
    setImage(null);
  }, [signupModalOpen]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
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
              paddingRight: "20px",
            }}
          >
            <div className="input-label">Full name</div>
            <Input
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name..."
            />
            <div className="input-label">Email</div>
            <Input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ID..."
            />
            <div className="input-label">Phone</div>
            <Input
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter valid phone number..."
            />
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
            />
            <div className="input-label">Confirm Password</div>
            <Input
              value={RePassword}
              onChange={(e) => setRePassword(e.target.value)}
              type="Password"
              placeholder="Retype your Password..."
            />
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
