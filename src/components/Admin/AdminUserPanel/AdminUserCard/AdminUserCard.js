import React from "react";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import { ImWindows } from "react-icons/im";
import { tokenHeader } from "../../../../services/HeaderService";
import "../AdminUserCard/AdminUserCard.css";

function AdminUserCard({ user }) {
  const viewUser = () => {};

  const deleteHandler = () => {
    const deleteURL = process.env.REACT_APP_SERVER_URL + "/user?id=" + user._id;
    console.log(deleteURL);
    fetch(deleteURL, {
      method: "DELETE",
      headers: tokenHeader(),
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  return (
    <div className="admin-user-card">
      <img src={user.profile_picture} alt={user.profile_picture}></img>
      <div className="user-details">
        <h2>{user.fullname}</h2>
      </div>
      <div className="admin-user-controls">
        <AiFillEye onClick={viewUser} />
        <AiOutlineDelete color="red" onClick={deleteHandler} />
      </div>
    </div>
  );
}

export default AdminUserCard;
