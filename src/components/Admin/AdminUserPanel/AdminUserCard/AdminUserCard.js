import React from "react";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import { ImWindows } from "react-icons/im";
import { useHistory } from "react-router";
import { tokenHeader } from "../../../../services/HeaderService";
import "../AdminUserCard/AdminUserCard.css";

function AdminUserCard({ user }) {
  const history = useHistory();

  const viewUser = (e, id) => {
    e.preventDefault();
    history.push({
      pathname: "/user",
      state: {
        id: id,
      },
    });
  };

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
    <div className="admin-user-card mt-3">
      <img src={user.profile_picture} alt="profile_picture"></img>
      <div className="user-details">
        <h2>{user.fullname}</h2>
        <div className="more-details">
          <p>User Type: ({user.role})</p>
          {user.is_subscribed ? <p>Subscribed: Yes</p> : <p>Subscribed: No</p>}
        </div>
      </div>
      <div className="admin-user-controls">
        <AiFillEye onClick={(e) => viewUser(e, user._id)} />
        <AiOutlineDelete color="red" onClick={deleteHandler} />
      </div>
    </div>
  );
}

export default AdminUserCard;
