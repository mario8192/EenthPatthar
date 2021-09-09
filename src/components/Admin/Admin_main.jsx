import React from 'react'
import { useHistory, Switch, Route } from 'react-router-dom';
import AdminPanel from './AdminPropertyPanel/AdminPropertyPanel';
import AdminUserPanel from './AdminUserPanel/AdminUserPanel';
export default function Admin_main({ user }) {
    const history = useHistory()

    const approveHandler = () => {
        history.push("/admin_main/admin-properties")
    }
    const userHandler = () => {
        history.push("/admin_main/admin-users")
    }
    return (
        <div>
            <div className="row">
                <div style={{ paddingTop: "7%", paddingLeft: "2%" }} className="col-md-2">
                    <div>
                        <table className="table table-hover table-bordered" style={{ width: "10rem" }}>
                            <tbody>
                                <tr>
                                    <td onClick={approveHandler}>Approve Advertisement</td>
                                </tr>
                                <tr>
                                    <td onClick = {userHandler}>Users</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-10">
                    <Switch>
                        <Route path="/admin_main/admin-properties">
                            <AdminPanel user={user}></AdminPanel>
                        </Route>
                        <Route path = "/admin_main/admin-users">
                            <AdminUserPanel user = {user}></AdminUserPanel>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
