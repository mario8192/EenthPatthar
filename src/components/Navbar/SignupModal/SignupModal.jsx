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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, [signupModalOpen]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create a new account</h2>
      <p id="simple-modal-description">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </p>
      <Button
        onClick={() => {
          setSignupModalOpen(false);
          handleSignup();
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
