import React, { Fragment } from "react";
import "./AdminPropertyPanel.css";

import useFetch from "../../../services/useFetch";
import AdminPropertyCard from "./AdminPropertyCard/AdminPropertyCard";

function AdminPanel({ user }) {
  const url = process.env.REACT_APP_SERVER_URL + "/advertisements";
  const { data: advertisements, isPending } = useFetch(
    process.env.REACT_APP_SERVER_URL + "/advertisements"
  );

  return (
    <div className="admin-property-panel">
      <h1>Approve Advertisements</h1>
      {advertisements && (
        <div className="property-list">
          {advertisements.advertisements.map((property) => (
            <Fragment key={property._id}>
              <AdminPropertyCard prop={property} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
export default AdminPanel;
