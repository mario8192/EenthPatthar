import React, { useState } from "react";
import useFetch from "../../../services/useFetch";
import UserViewModal from "../../UserView/UserPage/UserViewModal";
import AdminUserCard from "./AdminUserCard/AdminUserCard";
import "../AdminUserPanel/AdminUserPanel.css";

function AdminUserPanel({ user }) {
  const { data: users, isPending } = useFetch(
    process.env.REACT_APP_SERVER_URL + "/users"
  );

  const [UserViewModalOpen, setUserViewModalOpen] = useState();
  const [CurrentId, setCurrentId] = useState();

  return (
    <div className="admin-user-panel">
      <h1>View/Edit All Users</h1>
      {users && (
        <div className="user-list">
          {users.users.map((user) => (
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
