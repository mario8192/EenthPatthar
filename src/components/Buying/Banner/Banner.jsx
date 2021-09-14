import React, { Component, Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import displayRazorpay from "../../../services/paymentgateway";

import premium from "./images/premium.svg";
import padlock from "./images/lock.png";
import wallet from "./images/wallet.svg";
import "./Banner.css";

const Banner = ({ user, show, handleClose, handleShow, seller }) => {
  const LoginToUnlock = (
    <div className="col-md-12">
      <img className="banner-icon" src={padlock}></img>
      <h5 className="card-title">Login to access all features</h5>
    </div>
  );

  const SubscribeToContact = (
    <div>
      <img className="banner-icon" src={wallet}></img>
      <h5 className="card-title">
        Buy subscription now to contact sellers directly
      </h5>
      <button className="btn btn-outline-primary" onClick={handleShow}>
        Subscribe
      </button>
    </div>
  );

  const SellerInfo = (
    <Fragment>
      <h3 className="card-title">Seller Info</h3>
      <div>
        <img
          className="img-fluid rounded"
          src={seller && seller.profile_picture}
          alt="seller_image"
        />
        <h4 className="card-title">{seller && seller.fullname}</h4>
        <div style={{ height: "10px" }} />
        <div className="card-subtitle mt-1">
          Email <div className="seller-values">: {seller && seller.email}</div>
        </div>
        <div className="card-subtitle mt-1">
          Mobile{" "}
          <div className="seller-values">: {seller && seller.mobile}</div>
        </div>
      </div>
    </Fragment>
  );

  const Subscribed = (
    <div>
      <img className="banner-icon" src={premium}></img>
      <h5 className="card-title">Hooray! You are a subscribed member</h5>
    </div>
  );

  return (
    <div>
      <div className="banner">
        <div className="card">
          <div className="card-body">
            <div className="col-md-12">
              {user
                ? user.is_subscribed
                  ? seller
                    ? SellerInfo
                    : Subscribed
                  : SubscribeToContact
                : LoginToUnlock}
            </div>
          </div>
        </div>
      </div>

      {user && (
        <Modal show={show} onHide={handleClose}>
          {!user.is_subscribed ? (
            <Fragment>
              <Modal.Header closeButton>
                <Modal.Title>Subscribe Now</Modal.Title>
              </Modal.Header>
              <Modal.Body>Buy subscription to contact seller...</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Maybe Later
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
      )}
    </div>
  );
};

export default Banner;
