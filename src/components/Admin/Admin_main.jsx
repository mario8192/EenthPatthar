import React from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import AdminPanel from "./AdminPropertyPanel/AdminPropertyPanel";
import AdminUserPanel from "./AdminUserPanel/AdminUserPanel";
export default function Admin_main({ user }) {
  const history = useHistory();

  const approveHandler = () => {
    history.push("/admin_main/admin-properties");
  };
  const userHandler = () => {
    history.push("/admin_main/admin-users");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          width: "max-content",
        }}
      >
        <div
          style={{
            marginTop: "4%",
            paddingLeft: "2%",
            borderRight: "solid #dee2e6 2px",
          }}
        >
          <div>
            <table
              className="table table-hover table-bordered"
              style={{ width: "10rem" }}
            >
              <tbody>
                <tr>
                  <td onClick={approveHandler}>Manage Ads</td>
                </tr>
                <tr>
                  <td onClick={userHandler}>Manage Users</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ width: "1000px", margin: "30px 40px" }}>
          <Switch>
            <Route path="/admin_main/admin-properties">
              <AdminPanel user={user}></AdminPanel>
            </Route>
            <Route path="/admin_main/admin-users">
              <AdminUserPanel user={user}></AdminUserPanel>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
