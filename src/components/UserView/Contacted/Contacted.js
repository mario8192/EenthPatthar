import React, { useState, useEffect } from 'react'
import useFetch from '../../../services/useFetch'
import './Contacted.css'


function Contacted({user}) {
    const { data: adverts, isPending } = useFetch("http://localhost:5000/advertisements")
    const [property, setProperty] = useState(null)
    const [seller, setSeller] = useState(null)

    const showSellerChat = (advert) => {
        console.log("showing seller chat")
        fetch("http://localhost:5000/user?id=" + advert.author_details.id)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setSeller(data.user)
            setProperty(advert)
        })
    }

    return (
        <div className="contacted">
            {adverts && <div className="advert-list">
                {adverts.advertisements.map(advert => {
                    return (
                    <div className="advert-item" key={advert._id} onClick={() => showSellerChat(advert)}>
                        <img src={advert.images[0]} alt={advert.images[0]}></img>
                        <div className="advert-name">
                            <h2><strong>{advert.property_details.property_title}</strong></h2>
                            <p>{advert.address.city}</p>
                        </div>
                    </div>
                )})}
            </div>}
            {property == null ? <div></div> : <div className="seller-info">
                <div className="seller-header">
                    <img src={seller.profile_picture} alt={seller.profile_picture}></img>
                    <h2>{seller.fullname}</h2>
                    <p> {seller.mobile} </p>
                </div>
                <div className="chatbox">
                    <div className="chat-text">
                        <p>Im intrested in</p>
                    </div>
                    <div className="chat-property">
                        <h1>{property.property_details.property_title}</h1>
                        <p> {property.quoted_price}</p>
                        <img src="" alt=""></img>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Contacted
