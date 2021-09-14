import React, { useState, useEffect } from "react";
import { tokenHeader } from "../../../services/HeaderService";
import "./Contacted.css";

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
    <div className="contacted fadein">
      {adverts && (
        <div className="advert-list">
          <h4 className="column-heading pl-3 pt-2 pb-2 mb-0">
            You have contacted
          </h4>
          {adverts.map((advert) => {
            return (
              advert && (
                <div
                  className="advert-item hoverfill fadein"
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
        <React.Fragment>
          <div style={{ height: "200px" }}></div>
          <div className="empty-list-msg">Select a property to continue </div>
        </React.Fragment>
      ) : (
        <div className="seller-info ">
          <h2 className="column-heading">Chat with Seller </h2>
          <div className="seller-section fadein">
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
                <p>I'm interested in</p>
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
