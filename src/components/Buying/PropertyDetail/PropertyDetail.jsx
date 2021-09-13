import React, { useState, useEffect, Fragment } from "react";
import "./PropertyDetail.css";
import { useLocation, useHistory } from "react-router-dom";

import Banner from "../Banner/Banner";
import axios from "axios";
import { tokenHeader } from "../../../services/HeaderService";

export default function PropertyDetail({
  user,
  setLoginModalOpen,
  show,
  handleClose,
  handleShow,
}) {
  const location = useLocation();
  const [myAd, setmyAd] = useState(null);
  const [seller, setSeller] = useState(null);
  const history = useHistory();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [subscribed, setSubscribed] = useState(user && user.is_subscribed);

  // const sellerHandler = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //      alert("Please Subscribe")
  //   } else {
  //     setLoginModalOpen(true);
  //   }
  // };

  const sellerHandler = () => {
    // const token = localStorage.getItem("token");
    if (user) {
      if (subscribed) {
        updateLists();
      } else {
        handleShow();
      }
    } else {
      //  alert("Login First");
      console.log("Login to access all features");
      setLoginModalOpen(true);
    }
  };

  function updateLists() {
    if (myAd && user) {
      if (!myAd.interested.includes(user.id)) {
        fetch(
          `${process.env.REACT_APP_SERVER_URL}/addinterestedbuyer?id=${myAd._id}`,
          {
            method: "POST",
            headers: tokenHeader(),
          }
        ).then((res) => {
          alert(`The seller has been sent your information`);
          console.log(res);
        });
      } else {
        alert(`The seller has already been contacted`);
      }
    }

  const subscribeHandler = async() =>{
    //alert(`Opening Payment Panel`)
    displayRazorpay(myAd, user)
  }

  useEffect(() => {
    async function getSeller(ad) {
      try{
        if (subscribed) {
          const res = await axios.get(
            process.env.REACT_APP_SERVER_URL + `/user?id=${ad.author_details.id}`
          );
          const seller = res.data.user;
          //console.log(seller);
          setSeller(seller);
        }
      
       else {
        console.log("Get subscribed to contact sellers directly");}
      }catch(err) {
          console.log(err)
      }
    }

    async function getAd() {
      try {
        if (location.state.id) {
          const res = await axios.get(
            process.env.REACT_APP_SERVER_URL +
              `/advertisement?id=${location.state.id}`
          );
          const data = res.data.advertisement;
          //console.log(data);
          setmyAd(data);
          getSeller(data);
        }
      } catch (err) {
        alert(err.message);
      }
    }
    getAd();
    setSubscribed(user && user.is_subscribed);
  }, [location.state.id, subscribed, user]);

  return (
    <div>
      {myAd && (
        <div className="container mt-5 d-flex justify-content-md-between">
          <div className="card glow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h3 className="card-title">
                    {myAd.property_details.property_title}
                  </h3>
                  <div className="card-subtitle mb-2 mt-2">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                    {myAd.address.area_details}, {myAd.address.city}
                  </div>
                  <h5 className="card-subtitle mb-4 mt-2">
                    {" "}
                    {myAd.property_details.n_bhk} BHK
                  </h5>
                  <div className="card-text">
                    {myAd.property_details.description}
                  </div>
                  <div className="mt-4">
                    <img className="img-fluid" src={myAd.image} alt="alt" />
                  </div>
                </div>
                <div className="col-md-4 property-detail-right-container">
                  <h3 className="property-price">₹ {myAd.quoted_price}</h3>
                  <div className="contact-seller-button mt-5">
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

          <Banner
            user={user}
            seller={seller}
            handleClose={handleClose}
            handleShow={handleShow}
            show={show}
          ></Banner>

          {/* <div className="banner">
            <div className="card">
              <div className="card-body">
                {user ? (
                  <div className="col-md-12">
                    <h3 className="card-title">Seller Info</h3>
                    {user.is_subscribed && seller ? (
                      <div>
                        <img
                          className="img-fluid rounded"
                          src={seller.profile_picture}
                          alt="seller_image"
                        />
                        <h4 className="card-title">{seller.fullname}</h4>
                        <div className="card-subtitle">
                          Email: {seller.email}
                        </div>
                        <div className="card-subtitle">
                          Mobile: {seller.mobile}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h5 className="card-title">
                          Buy subscription now to contact seller directly
                        </h5>
                        <button
                          className="btn btn-outline-primary"
                          onClick={handleShow}
                        >
                          Subscribe
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="col-md-12">
                    <h5 className="card-title">Login to access all features</h5>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      )}

      {/* {user && (
        <Modal show={show} onHide={handleClose}>
          {!subscribed ? (
            <Fragment>
              <Modal.Header closeButton>
                <Modal.Title>Subscribe Now</Modal.Title>
              </Modal.Header>
              <Modal.Body>Buy subscription to contact seller..</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Later
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    displayRazorpay();
                  }}
                >
                  Proceed to Pay
                </Button>
              </Modal.Footer>
            </Fragment>
          ) : (
            <Fragment>
              <Modal.Header closeButton>
                <Modal.Title>Already Subscribed</Modal.Title>
              </Modal.Header>
              <Modal.Body>{user.fullname} is already subscribed</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Fragment>
          )}
        </Modal>
      )} */}
    </div>
  );
}
