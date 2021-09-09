import React from 'react'
import useFetch from '../../../services/useFetch'
import AdminUserCard from './AdminUserCard/AdminUserCard'
import '../AdminUserPanel/AdminUserPanel.css'


function AdminUserPanel({user}) {
    const { data: users, isPending } = useFetch(process.env.REACT_APP_SERVER_URL + "/users")
    return (
        <div className="admin-user-panel">
            <h1>View/Edit All Users</h1>
            {users && <div className="user-list">
                {users.users.map((user, ) => (
                    <AdminUserCard user={user} key={user._id} eventHandler/>
                ))}
            </div>}
        </div>
    )
}

export default AdminUserPanel
