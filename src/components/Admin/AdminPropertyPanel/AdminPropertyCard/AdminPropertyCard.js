import React, { useState, useEffect } from 'react'
import { AiOutlineEye, AiFillEye, AiOutlineDelete } from 'react-icons/ai'
import { RiCheckboxCircleLine, RiCheckboxCircleFill } from 'react-icons/ri'
import { ImLocation2 } from 'react-icons/im'
import '../AdminPropertyCard/AdminPropertyCard.css'

function AdminPropertyCard({prop}) {
    const [property, setProperty] = useState(prop)
    const [isApproved, setIsApproved] = useState(property.is_approved)

    const approvalHandler = () => {
        fetch("http://841b-2405-201-1b-3826-1c0a-5a65-6566-25bc.ngrok.io/approve?id=" + property._id, {
            method: "PUT",
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application.json",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5OThkZTVjMy03M2I3LTQ0MzMtYWQ4YS1lNzRlNGMxNTI4ZmUiLCJlbWFpbCI6ImFuaXNoLnRAZGVtby5jb20iLCJpYXQiOjE2MzA5OTcwMTgsImV4cCI6MTYzMTAwMDYxOH0.aqXPvI1WooXk3eXTKYNU8GFZEdHsiYWY3kCaDrSPaHY"
            }
        }).then(res => {
            setIsApproved(!isApproved)
            console.log(res)
        })
    }

    const deleteHandler = () => {
        const deleteURL = "http://841b-2405-201-1b-3826-1c0a-5a65-6566-25bc.ngrok.io/deleteadvertisement?id="+property._id
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

    const viewProperty = () => {

    }

    return (
        <div className="property-card">
            <div className="property-image">
                <img src={property.images[0]} alt={property.images[0]}></img>
            </div>
            <div className="property_details">
                <h1>{property.property_details.property_title}</h1>
                <p> <ImLocation2 />{property.address.city}</p>
            </div>
            <div className="property-posting-details">
                <p><strong>Posted On:</strong><br />{property.updatedAt.slice(0, 10)}</p>
                <p><strong>Posted By:</strong><br />{property.author_details.fullname}</p>
            </div>
            <div className="property-admin-controls">
                {property.interested === 0 ? <AiOutlineEye onClick={viewProperty}/> : <AiFillEye />}
                {isApproved ? <RiCheckboxCircleFill onClick={approvalHandler}/> : <RiCheckboxCircleLine onClick={approvalHandler}/>}
                <AiOutlineDelete color='red' onClick={deleteHandler}/>
            </div>
        </div>
    )
}

export default AdminPropertyCard
