import React, { useState, useEffect } from 'react'
import useFetch from '../../../services/useFetch'
import './Offers.css'

function Offers() {
    const { data: adverts, isPending } = useFetch("http://localhost:5000/advertisements")
    const [ property, setProperty] = useState(null)
    const [ buyers, setBuyers ] = useState(null)

    const showBuyersInterested =(advert) => {
        console.log("showing sbuyer list")
        fetch("http://localhost:5000/user?id=" + advert.author_details.id)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setProperty(advert)
            setBuyers(property.interested)
        })
    }
    return (
        <div className="offers">
            {adverts && <div className="advert-list">
                {adverts.advertisements.map(advert => (
                    <div className="advert-item" key={advert._id} onClick={() => showBuyersInterested(advert)}>
                        <img src={advert.images[0]} alt={advert.images[0]}></img>
                        <div className="advert-name">
                            <h2><strong>{advert.property_details.property_title}</strong></h2>
                            <p>{advert.address.city}</p>
                        </div>
                    </div>
                ))}
            </div>}
            {buyers && <div className="interested-users">
                {buyers.map(buyer => (
                    <div className="buyer-item">
                        <img src={buyer.profile_picture} alt={buyer.profile_picture}></img>
                        <div className="buyer-intro">
                            <h2><strong>{buyer.fullname}</strong></h2>
                            <p>{buyer.mobile}</p>
                        </div>
                    </div>
                ))}
            </div>}
            <div className="buyer-chat">
                <h1>buyer chat</h1>
            </div>
        </div>
    )
}

export default Offers
