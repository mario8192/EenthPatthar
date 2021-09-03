import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "./SignupModal.css";

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
  const { signupModalOpen, setSignupModalOpen, handleSignup } = props;

  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

  useEffect(() => {
    setFullName("");
    setEmail("");
    setPassword("");
  }, [signupModalOpen]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create a new account</h2>
      <p id="simple-modal-description">
        <Input
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
        />
        <Input
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email id"
        />
        <Input
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter valid phone number..."
        />
        <Input
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          type="Password"
          placeholder="Enter a Password..."
        />
        <Input
          value={RePassword}
          onChange={(e) => setRePassword(e.target.value)}
          type="Password"
          placeholder="Retype your Password..."
        />
      </p>
      <Button
        onClick={() => {
          setSignupModalOpen(false);
          handleSignup(FullName, Email, Phone, Password, RePassword);
        }}
      >
        Create
      </Button>
      <SignupModal />
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
