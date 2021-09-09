import React, { useEffect } from "react";
import { tokenHeader } from "../../services/HeaderService";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import "./myprofile.css";

export default function MyProfileCard(props) {
  const [myAds, setmyAds] = useState(null);
  const { user } = props;
  const history = useHistory();

  const adformHandler = (event) => {
    event.preventDefault();
    history.push("/adform");
  };
  useEffect(() => {
    fetchmyAds();
  }, []);

  const fetchmyAds = async (event) => {
    // event.preventDefault();
    try {
      const structure = {
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + "/myadvertisements",
        headers: tokenHeader(),
      };
      const res = await axios(structure);
      const ads = res.data.advertisements.map((ad) => {
        return {
          id: ad._id,
          title: ad.property_details.property_title,
          posted: ad.posted_on,
          intrested: ad.intrested,
          area: ad.address.area_details,
          city: ad.address.city,
          price: ad.quoted_price,
          approve: ad.is_approved,
          type: ad.property_details.property_type,
          bhk: ad.property_details.n_bhk,
          desc: ad.property_details.description,
          image: ad.image,
        };
      });
      setmyAds(ads);
      console.log(ads);
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteHandler = async (e, Id) => {
    e.preventDefault();
    try {
      let structure = {
        method: "delete",
        url: process.env.REACT_APP_SERVER_URL + `/advertisement?id=${Id}`,
        headers: tokenHeader(),
      };
      const res = await axios(structure);
      alert(res.data.message);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const updateHandler = async (
    e,
    p_id,
    p_title,
    p_type,
    p_desc,
    p_bhk,
    p_area,
    p_city,
    p_price,
    p_image
  ) => {
    e.preventDefault();
    history.push({
      pathname: "/adform",
      state: {
        p_id,
        p_title,
        p_type,
        p_desc,
        p_bhk,
        p_area,
        p_city,
        p_price,
        p_image,
      },
    });
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {user && (
              <div
                className="card"
                style={{ width: "18rem", height: "auto", textAlign: "center" }}
              >
                <div className="card-body">
                  <h5 className="card-title">My Profile</h5>
                  <div className="card-subtitle">
                    <div className="adjust_image">
                      <img
                        className="img-fluid rounded"
                        src={user.profile_picture}
                        alt="my_image"
                      />
                    </div>
                  </div>
                  <div className="card-text">
                    <h2>{user.fullname}</h2>
                    <p>{user.email}</p>
                    <h6>{user.mobile}</h6>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="row">
              {/* <div onClick={fetchmyAds} className="col">
                <button className="btn btn-outline-primary">
                  Show my Advertisements
                </button>
              </div> */}
              <div className="col-md-4" onClick={adformHandler}>
                <button className="btn btn-outline-primary">
                  Start an advertisement
                </button>
              </div>
            </div>
            <div className="row">
              {myAds &&
                myAds.map((val) => {
                  return (
                    <div className="mt-3" key={val.id}>
                      <div className="card" style={{ width: "max" }}>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="adjust_image">
                              <img
                                className="img-fluid"
                                src={val.image}
                                alt="property_image"
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-5">
                                  <h5 className="card-title">{val.title}</h5>
                                  <small>
                                    <i
                                      className="fa fa-map-marker"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {val.area}, {val.city}
                                  </small>
                                </div>
                                <div className="col-md-7 col-buttons">
                                  <h6 className="card-title">
                                    Posted on : {val.posted}
                                  </h6>
                                  <div
                                    style={{
                                      float: "right",
                                      margin: "0 0 0 auto",
                                    }}
                                  >
                                    <button
                                      className="btn btn-outline-dark"
                                      onClick={(e) => deleteHandler(e, val.id)}
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                    <br />
                                    <br />
                                    <button
                                      className="btn btn-outline-dark"
                                      onClick={(e) =>
                                        updateHandler(
                                          e,
                                          val.id,
                                          val.title,
                                          val.type,
                                          val.desc,
                                          val.bhk,
                                          val.area,
                                          val.city,
                                          val.price,
                                          val.image
                                        )
                                      }
                                    >
                                      <i
                                        className="fa fa-pencil-square-o"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-5">
                                  <h6 className="card-title">
                                    Intrested : {val.intrested}
                                  </h6>
                                </div>
                                <div className="col-md-7">
                                  <h6 className="card-title">
                                    Approved : {val.approve}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
