import React, { Component, Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import displayRazorpay from "../../../services/paymentgateway";

const Banner = ({ user, show, handleClose, handleShow, seller }) => {
  const LoginToUnlock = (
    <div className="col-md-12">
      <h5 className="card-title">Login to access all features</h5>
    </div>
  );

  const SubscribeToContact = (
    <div>
      <h5 className="card-title">
        Buy subscription now to contact seller directly
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
        <div className="card-subtitle">Email: {seller && seller.email}</div>
        <div className="card-subtitle">Mobile: {seller && seller.mobile}</div>
      </div>
    </Fragment>
  );

  const Subscribed = <div>You are subscribed</div>;

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
      )}
    </div>
  );
};

export default Banner;
