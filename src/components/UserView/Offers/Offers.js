import React, { useState, useEffect } from "react";
import { tokenHeader } from "../../../services/HeaderService";
import useFetch from "../../../services/useFetch";
import "./Offers.css";

function Offers() {
  const { data: adverts, isPending } = useFetch(
    process.env.REACT_APP_SERVER_URL + "/myadvertisements"
  );
  const [property, setProperty] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    async function func() {
      if (property && property.interested) {
        const t_buyers = [];

        for (let i = 0; i < property.interested.length; i++) {
          const buyer_id = property.interested[i];
          let res = await fetch(
            process.env.REACT_APP_SERVER_URL + "/user?id=" + buyer_id
          );
          res = await res.json();

          if (res.user) {
            const t_user = res.user;
            const ids = buyers.filter((el) => {
              return el._id;
            });
            if (!ids.includes(t_user._id)) {
              t_buyers.push(t_user);
            }
          }
        }
        setBuyers(t_buyers);
      }
    }
    func();
  }, [property]);

  useEffect(() => {
    console.log(buyers);
  }, buyers);

  const showBuyersInterested = async (advert) => {
    console.log("showing buyer list");
    setProperty(advert);
  };

  const showBuyerChat = (buyer) => {
    console.log("showing seller chat");
    fetch(process.env.REACT_APP_SERVER_URL + "/user?id=" + buyer._id, {
      headers: tokenHeader(),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBuyer(data.user);
      });
  };

  return (
    <div className="offers">
      {adverts && (
        <div className="advert-list">
          <h2 className="column-heading">My Advertisements</h2>
          {adverts.advertisements.map((advert) => (
            <div
              className="advert-item hoverfill"
              key={advert._id}
              onClick={() => showBuyersInterested(advert)}
            >
              <img src={advert.image} alt="Property Image"></img>
              <div className="advert-name">
                <p>
                  <strong>{advert.property_details.property_title}</strong>
                </p>
                <p>{advert.address.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="interested-users">
        <h2 className="column-heading">Buyer List</h2>
        <div className="buyer-list">
          {buyers &&
            buyers.map(
              (buyer) =>
                buyer && (
                  <div
                    className="buyer-item hoverfill"
                    key={buyer._id}
                    onClick={() => showBuyerChat(buyer)}
                  >
                    <img src={buyer.profile_picture} alt="Buyer Image"></img>
                    <div className="buyer-intro">
                      <p>
                        <strong>{buyer.fullname}</strong>
                      </p>
                      <p>{buyer.mobile}</p>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>

      {buyer && (
        <div className="buyer-contact">
          <h2 className="column-heading">Buyer Chat</h2>
          <div className="buyer-section">
            <div className="buyer-header">
              <img src={buyer.profile_picture} alt="Buyer Image"></img>
              <h2>{buyer.fullname}</h2>
              <p>{buyer.mobile}</p>
            </div>
            <div className="buyer-chat">
              <div className="chatbox">
                <div className="chat-text">
                  <p>Buyer was interested in</p>
                </div>
                <div className="chat-property">
                  <h1>{property.property_details.property_title}</h1>
                  <p> {property.quoted_price}</p>
                  <img src={property.image} alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offers;
