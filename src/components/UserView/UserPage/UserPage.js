import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import useFetch from '../../../services/useFetch'
import './UserPage.css'

function UserPage() {
    const location = useLocation()
    const {data , isPending} = useFetch(process.env.REACT_APP_SERVER_URL + "/user?id=" + location.state.id)
    const user = data ? data.user : null
    console.log(user)
    return (
        <div className="container mt-5">
            {user && <div className="user-content">
                <div className="prof_pic"><img src={user.profile_picture} alt={user.profile_picture}></img></div>
                <div className="user_details">
                    <div className="user-col-1">
                        <h3>Name: {user.fullname}</h3>
                        <h3>Email: {user.email}</h3>
                        <h3>Mobile Number: {user.mobile}</h3>
                    </div>
                    <div className="user-col-2">
                        {user.is_subscribed ? <h3>Subscription: Yes</h3> : <h3>Subscription : No</h3>}
                        {user.role === 'user' ? <h3>User Type: Normal</h3> : <h3>User Type: Admin</h3>}
                        <h3>User Registered at {user.createdAt.slice(0, 10)}</h3>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UserPage
