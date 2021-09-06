import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "./SignupModal.css";
import ImageInput from "./ImageInput/ImageInput";

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
    // border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SignupModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { signupModalOpen, setSignupModalOpen, handleSignup, switchModal } =
    props;

  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [ImageURL, setImageURL] = useState("");

  useEffect(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRePassword("");
    setImageURL("https://avatars.githubusercontent.com/u/48586282?v=4");
  }, [signupModalOpen]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create a new account</h2>
      <p className="modal-subtitle">Enter your details</p>
      <p id="simple-modal-description">
        <div style={{ display: "flex", flexDirection: "row" }}>
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
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
            <ImageInput ImageURL />
          </div>
        </div>
      </p>
      <div className="loginform__buttons__container">
        <Button
          onClick={() => {
            switchModal();
          }}
        >
          Login Instead
        </Button>
        <Button
          onClick={() => {
            setSignupModalOpen(false);
            handleSignup({
              fullname: FullName,
              email: Email,
              mobile: Phone,
              password: Password,
              role: "admin",
              is_subscribed: false,
            });
          }}
        >
          Create
        </Button>
      </div>

      <SignupModal open={signupModalOpen} />
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
