import React, { useState } from "react";
import useFetch from "../../../services/useFetch";
import UserViewModal from "../../UserView/UserPage/UserViewModal";
import AdminUserCard from "./AdminUserCard/AdminUserCard";
import "../AdminUserPanel/AdminUserPanel.css";

function AdminUserPanel({ user }) {
  const [Search, setSearch] = useState("");
  const { data: users, isPending } = useFetch(
    process.env.REACT_APP_SERVER_URL + "/users"
  );
  console.log(users)

  const [UserViewModalOpen, setUserViewModalOpen] = useState();
  const [CurrentId, setCurrentId] = useState();

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="admin-user-panel">
      <h1>View/Edit All Users</h1>
      <div className="m-auto">
          <form>
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Search users as per full-name"
              style={{ width: "780px", borderRadius: "25px" }}
              value={Search}
              onChange={searchHandler}
            />
          </form>
        </div>
      {users && (
        <div className="user-list">
          {users.users.filter((val) => {
            if (Search === "") {
              return val;
            } else if (
              val.fullname.toLowerCase().includes(Search.toLowerCase())
            ) {
              return val;
            }
          }).map((user) => (
            <AdminUserCard
              user={user}
              key={user._id}
              setUserViewModalOpen={setUserViewModalOpen}
              setCurrentId={setCurrentId}
              eventHandler
            />
          ))}
        </div>
      )}
      <UserViewModal
        UserViewModalOpen={UserViewModalOpen}
        setUserViewModalOpen={setUserViewModalOpen}
        CurrentId={CurrentId}
      />
    </div>
  );
}

export default AdminUserPanel;
