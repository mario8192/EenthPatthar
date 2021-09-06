import React, { useState, useEffect } from "react";
import "./PropertyDetail.css";
import property from "../PropertyList/property.jpeg";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

export default function PropertyDetail(props) {
  const { setLoginModalOpen } = props;
  const location = useLocation();
  const [myAd, setmyAd] = useState(null);
  const history = useHistory();

  const sellerHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      alert(
        `The seller is ${myAd.author_details.fullname} and you can reach out on ${myAd.author_details.email}`
      );
    } else {
      // alert("Login First");
      setLoginModalOpen(true);
    }
  };
  useEffect(() => {
    async function getAd() {
      try {
        if (location.state.id) {
          const res = await axios.get(
            process.env.REACT_APP_SERVER_URL +
              `/advertisement?id=${location.state.id}`
          );
          const data = res.data.advertisement;
          console.log(data);
          setmyAd(data);
        }
      } catch (err) {
        alert(err.message);
      }
    }
    getAd();
  }, [location.state.id]);
  return (
    <div>
      {myAd && (
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="card-title">
                    {myAd.property_details.property_title}
                  </h4>
                  <div className="card-subtitle mb-2 mt-4">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                    {myAd.address.area_details}, {myAd.address.city}
                  </div>
                  <h6 className="card-subtitle mb-2 mt-4">
                    {" "}
                    {myAd.property_details.n_bhk} BHK
                  </h6>
                  <div className="card-text">
                    {myAd.property_details.description}
                  </div>
                  <div className="mt-4">
                    <img className="img-fluid" src={property} alt="alt" />
                  </div>
                </div>
                <div className="col-md-4">
                  <h5>₹ {myAd.quoted_price}</h5>
                  <div className="mt-5">
                    <button
                      className="btn btn-outline-primary"
                      onClick={sellerHandler}
                    >
                      <i className="fa fa-handshake-o" aria-hidden="true"></i>{" "}
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
