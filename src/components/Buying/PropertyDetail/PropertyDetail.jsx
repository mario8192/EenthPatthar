import React, { useState, useEffect, Fragment } from "react";
import "./PropertyDetail.css";
import { useLocation, useHistory } from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';
import axios from "axios";
import displayRazorpay from "../../../services/paymentgateway";

export default function PropertyDetail(props) {
  const { user, setLoginModalOpen } = props;
  const location = useLocation();
  const [myAd, setmyAd] = useState(null);
  const [seller, setSeller] = useState(null)
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subscribed, setSubscribed] = useState(user && user.is_subscribed)

  // const sellerHandler = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //      alert("Please Subscribe")
  //   } else {
  //     setLoginModalOpen(true);
  //   }
  // };


  const sellerHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
       handleShow()
    } else {
      //  alert("Login First");
      console.log("Please Login")
      setLoginModalOpen(true);
    }
  };

 

  useEffect(() => {
    async function getSeller(ad){
      if(subscribed){
        const res = await axios.get(
          process.env.REACT_APP_SERVER_URL + 
            `/user?id=${ad.author_details.id}`
        );
        const seller = res.data.user;
        console.log(seller);
        setSeller(seller)
      } else {
        console.log("Please Subscribe")
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
          console.log(data);
          setmyAd(data);
          getSeller(data)
        }
      } catch (err) {
        alert(err.message);
      }
    }
    getAd();
    setSubscribed(user && user.is_subscribed)
  }, [location.state.id, subscribed, user]);


  return (
    <div>
      {myAd && (
        <div className="container mt-5 d-flex justify-content-md-between">
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
                    <img className="img-fluid" src={myAd.image} alt="alt" />
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

          <div className="banner">
            <div className="card">
              <div className="card-body">
                {user ? <div className="col-md-12">
                  <h3 className="card-title">Seller Inforamation</h3>
                  {user.is_subscribed && seller ? <div>
                    <img
                      className="img-fluid rounded"
                      src={seller.profile_picture}
                      alt="seller_image"
                    />
                    <h4 className="card-title">{seller.fullname}</h4>
                    <div className="card-subtitle">Email: {seller.email}</div>
                    <div className="card-subtitle">Mobile: {seller.mobile}</div>
                  </div> : <div>
                      <h4 className="card-title">Please Subscribe to see the seller information</h4>
                      <button className="btn btn-outline-primary" onClick={handleShow}>Subscribe</button>
                  </div>}
                </div> : <div className="col-md-12">
                    <h3 className="card-title">Please Login First</h3>
                </div>}
              </div>
            </div>
          </div>



          </div>
      )}

      {user && <Modal show={show} onHide={handleClose}>
        {!subscribed ? <Fragment>
          <Modal.Header closeButton>
            <Modal.Title>Subscribe Now</Modal.Title>
          </Modal.Header>
          <Modal.Body>Buy subscription to contact seller..</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Later
            </Button>
            <Button variant="primary" onClick={() => displayRazorpay()}>
              Proceed to Pay
            </Button>
          </Modal.Footer>
        </Fragment> : <Fragment>
          <Modal.Header closeButton>
            <Modal.Title>Already Subscribed</Modal.Title>
          </Modal.Header>
          <Modal.Body>{user.fullname} is already subscribed</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
          </Fragment>}
      </Modal>}

    </div>
  );
}
