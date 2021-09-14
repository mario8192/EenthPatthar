import React from "react";
import { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { tokenHeader } from "../../../services/HeaderService";
import "./UserPage.css";

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 390,
//     backgroundColor: theme.palette.background.paper,
//     // border: "2px solid #000",
//     borderRadius: "5px",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

function UserViewModal({ CurrentId, setUserViewModalOpen, UserViewModalOpen }) {
  const [user, setUser] = useState();
  // const [body, setBody] = useState();

  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    async function func() {
      const url = process.env.REACT_APP_SERVER_URL + "/user?id=" + CurrentId;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: tokenHeader(),
        });

        const data = await res.json();
        setUser(data ? data.user : null);
        console.log("fetched user modal", data.user);
      } catch (err) {
        alert(err);
      }
    }
    func();
  }, [CurrentId]);

  // className="container mt-5 admin-user-container"

  const body = (
    <div className="container mt-5 admin-user-container">
      {user && (
        <div className="user-content">
          <div className="prof_pic">
            <img src={user.profile_picture} alt={user.profile_picture}></img>
          </div>
          <hr />
          <div className="user_details">
            <div className="user-col-1">
              <h2>{user.fullname}</h2>
              <h6>{user.email}</h6>
              <h6>{user.mobile}</h6>
            </div>
            <div className="user-col-2">
              <h6>
                Subscribed
                <div className="value">
                  : {user.is_subscribed ? "Yes" : "No"}
                </div>
              </h6>
              <h6>
                Type
                <div className="value">
                  : {user.role === "user" ? "Normal" : "Admin"}
                </div>
              </h6>
              <h6>
                Registered
                <div className="value"> : {user.createdAt.slice(0, 10)}</div>
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      open={UserViewModalOpen}
      onClose={() => {
        setUserViewModalOpen(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default UserViewModal;
