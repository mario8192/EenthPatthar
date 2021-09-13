import React, { useState, useEffect } from 'react'
import { tokenHeader } from '../../../services/HeaderService'
import './Contacted.css'

function Contacted({ user }) {
  //const { data: adverts, isPending } = useFetch(process.env.REACT_APP_SERVER_URL+"/advertisements")
  const [adverts, setAdverts] = useState([]);
  const [property, setProperty] = useState(null);
  const [seller, setSeller] = useState(null);
  console.log(user);

  useEffect(() => {
    try {
      if (user.id) {
        fetch(process.env.REACT_APP_SERVER_URL + "/user?id=" + user.id, {
          headers: tokenHeader(),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data.user.contacted_ads);
            data.user.contacted_ads.map((id) => {
              fetch(
                process.env.REACT_APP_SERVER_URL + "/advertisement?id=" + id
              )
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  setAdverts((adverts) => [...adverts, data.advertisement]);
                });
              return null;
            });
          });
      }
    } catch {
      console.log("Errors");
    }
  }, [user.id]);

  console.log(adverts);

  const showSellerChat = (advert) => {
    console.log("showing seller chat");
    fetch(
      process.env.REACT_APP_SERVER_URL + "/user?id=" + advert.author_details.id,
      {
        headers: tokenHeader(),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSeller(data.user);
        setProperty(advert);
      });
  };

  return (
    <div className="contacted">
      {adverts && (
        <div className="advert-list">
          <h2 className="column-heading">Contacted Properties</h2>
          {adverts.map((advert) => {
            return (
              advert && (
                <div
                  className="advert-item mt-1"
                  key={advert._id}
                  onClick={() => showSellerChat(advert)}
                >
                  <img src={advert.image} alt="image"></img>
                  <div className="advert-name">
                    <h2>
                      <strong>{advert.property_details.property_title}</strong>
                    </h2>
                    <p>{advert.address.city}</p>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}

      {property == null ? (
        <div></div>
      ) : (
        <div className="seller-info">
          <h2 className="column-heading">Seller Chat</h2>
          <div className="seller-section">
            <div className="seller-header">
              <img
                className="img-fluid"
                src={seller.profile_picture}
                alt="Seller_image"
              ></img>
              <h2>{seller.fullname}</h2>
              <p> {seller.mobile} </p>
            </div>
            <div className="chatbox">
              <div className="chat-text">
                <p>Im interested in</p>
              </div>
              <div className="chat-property">
                <h1>{property.property_details.property_title}</h1>
                <p> {property.quoted_price}</p>
                <img src={property.image} alt="property image"></img>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacted;
