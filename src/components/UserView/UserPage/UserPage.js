import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import useFetch from "../../../services/useFetch";
import "./UserPage.css";

function UserPage() {
  const location = useLocation();
  const { data, isPending } = useFetch(
    process.env.REACT_APP_SERVER_URL + "/user?id=" + location.state.id
  );
  const user = data ? data.user : null;
  console.log(user);
  return (
    <div className="container mt-5 admin-user-container">
      {user && (
        <div className="user-content">
          <div className="prof_pic">
            <img src={user.profile_picture} alt={user.profile_picture}></img>
          </div>
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
}

export default UserPage;
