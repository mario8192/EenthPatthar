import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "./LoginModal.css";

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

const LoginModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { loginModalOpen, setLoginModalOpen, handleLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [loginModalOpen]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Login to your account</h2>
      <p className="modal-subtitle">Enter login info</p>
      <p id="simple-modal-description">
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
          setLoginModalOpen(false);
          handleLogin(email, password);
        }}
      >
        Login
      </Button>
      <LoginModal />
    </div>
  );

  return (
    <Modal
      open={loginModalOpen}
      onClose={() => {
        setLoginModalOpen(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default LoginModal;
