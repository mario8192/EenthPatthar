import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiFillEye, AiOutlineDelete } from "react-icons/ai";
import { RiCheckboxCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import "../AdminPropertyCard/AdminPropertyCard.css";
import { tokenHeader } from "../../../../services/HeaderService";
import { useHistory } from "react-router";

function AdminPropertyCard({ prop }) {
  const [property, setProperty] = useState(prop);
  const [isApproved, setIsApproved] = useState(property.is_approved);
  const history = useHistory();

  const approvalHandler = (ad) => {
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/approve?id=" +
        ad._id +
        "&approval=" +
        !isApproved,
      {
        method: "PUT",
        headers: tokenHeader(),
      }
    ).then((res) => {
      setIsApproved(!isApproved);
      console.log(res);
    });
  };

  const deleteHandler = () => {
    const deleteURL =
      process.env.REACT_APP_SERVER_URL +
      "/deleteadvertisement?id=" +
      property._id;
    console.log(deleteURL);
    fetch(deleteURL, {
      method: "DELETE",
      headers: tokenHeader(),
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  const viewProperty = (e, id) => {
    console.log("go to property details page");
    e.preventDefault();
    history.push({
      pathname: "/ad",
      state: {
        id: id,
      },
    });
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt="property_image"></img>
      </div>
      <div className="property_details">
        <h2>{property.property_details.property_title}</h2>
        <p>
          {" "}
          <ImLocation2 />
          {property.address.city}
        </p>
      </div>
      <div className="property-posting-details">
        <p>
          <strong>Posted On:</strong>
          <br />
          {property.updatedAt.slice(0, 10)}
        </p>
        <p>
          <strong>Posted By:</strong>
          <br />
          {property.author_details.fullname}
        </p>
      </div>
      <div className="property-admin-controls">
        <AiFillEye onClick={(e) => viewProperty(e, property._id)} />
        {isApproved ? (
          <RiCheckboxCircleFill onClick={() => approvalHandler(property)} />
        ) : (
          <RiCheckboxCircleLine onClick={() => approvalHandler(property)} />
        )}
        <AiOutlineDelete color="red" onClick={deleteHandler} />
      </div>
    </div>
  );
}

export default AdminPropertyCard;
