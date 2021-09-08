import React from 'react'
import useFetch from '../../../services/useFetch'
import AdminUserCard from './AdminUserCard/AdminUserCard'
import '../AdminUserPanel/AdminUserPanel.css'

function AdminUserPanel({user}) {
    const { data: users, isPending } = useFetch("http://841b-2405-201-1b-3826-1c0a-5a65-6566-25bc.ngrok.io/users")
    return (
        <div className="admin-user-panel">
            <h1>View/Edit All Users</h1>
            {users && <div className="user-list">
                {users.users.map((user, ) => (
                    <AdminUserCard user={user} key={user._id}/>
                ))}
            </div>}
        </div>
    )
}

export default AdminUserPanel
