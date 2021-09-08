import React from 'react'
import { AiFillEye, AiOutlineDelete } from 'react-icons/ai'
import { ImWindows } from 'react-icons/im'
import '../AdminUserCard/AdminUserCard.css'

function AdminUserCard({user}) {

    const viewUser = () => {

    }

    const deleteHandler = () => {
        const deleteURL = "http://841b-2405-201-1b-3826-1c0a-5a65-6566-25bc.ngrok.io/user?id=" + user._id
        console.log(deleteURL)
        fetch(deleteURL, {
            method: "DELETE",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5OThkZTVjMy03M2I3LTQ0MzMtYWQ4YS1lNzRlNGMxNTI4ZmUiLCJlbWFpbCI6ImFuaXNoLnRAZGVtby5jb20iLCJpYXQiOjE2MzA5OTcwMTgsImV4cCI6MTYzMTAwMDYxOH0.aqXPvI1WooXk3eXTKYNU8GFZEdHsiYWY3kCaDrSPaHY"
            }
        })
        .then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    return (
        <div className="admin-user-card">
            <img src={user.profile_picture} alt={user.profile_picture}></img>
            <div className="user-details">
                <h2>{user.fullname}</h2>
            </div>
            <div className="admin-user-controls">
                <AiFillEye onClick={viewUser}/>
                <AiOutlineDelete color='red' onClick={deleteHandler}/>
            </div>
        </div>
    )
}

export default AdminUserCard
