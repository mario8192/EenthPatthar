import React, { useEffect, useState } from "react";
import "./PropertyList.css";
import property from "./property.jpeg";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

export default function PropertyList() {
  const [Ads, setAds] = useState(null);
  const [Search, setSearch] = useState("");
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  const history = useHistory();
  const eventHandler = (e, id) => {
    e.preventDefault();
    // console.log(id)
    history.push({
      pathname: "/ad",
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    async function getAds() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/advertisements"
        );
        const ads = res.data.advertisements.map((ad) => {
          return {
            id: ad._id,
            title: ad.property_details.property_title,
            price: ad.quoted_price,
            desc: ad.property_details.description,
            bhk: ad.property_details.n_bhk,
            area: ad.address.area_details,
            city: ad.address.city,
            type: ad.property_details.property_type,
          };
        });
        setAds(ads);
      } catch (err) {
        alert(err.message);
      }
    }
    getAds();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <form>
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Search property as per type, city, BHKs"
            style={{ width: "780px", borderRadius: "25px" }}
            value={Search}
            onChange={searchHandler}
          />
        </form>
        <div>
          <div className="row">
            {Ads &&
              Ads.filter((val) => {
                if (Search === "") {
                  return val;
                } else if (
                  val.type.toLowerCase().includes(Search.toLowerCase())
                ) {
                  return val;
                } else if (val.bhk == Search) {
                  return val;
                } else if (
                  val.city.toLowerCase().includes(Search.toLowerCase())
                ) {
                  return val;
                }
              }).map((ourAds) => {
                return (
                  <div className="mt-3" key={ourAds.id}>
                    <div
                      className="card"
                      style={{ width: "800px", borderRadius: "10px" }}
                    >
                      <Link
                        onClick={(e) => eventHandler(e, ourAds.id)}
                        to="/ad"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="row">
                          <div className="col-md-4">
                            <div className="adjust_image">
                              <img
                                className="img-fluid"
                                src={property}
                                alt="property_image"
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <div className="row">
                                <div className="col">
                                  <h5 className="card-title">{ourAds.title}</h5>
                                </div>
                                <div className="col">
                                  <h4 style={{ float: "right" }}>
                                    ₹{ourAds.price}
                                  </h4>
                                </div>
                              </div>
                              <div className="card-subtitle mb-2">
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>{" "}
                                {ourAds.area}, {ourAds.city}
                              </div>
                              <div className="card-text">{ourAds.desc}</div>
                              <div className="row">
                                <div className="col-6 col-sm-2">
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary mt-2"
                                    style={{ borderRadius: "15px" }}
                                  >
                                    {ourAds.bhk} BHK
                                  </button>
                                </div>
                                <div className="col-col-6 col-sm-2">
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary mt-2"
                                    style={{ borderRadius: "15px" }}
                                  >
                                    {ourAds.type}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
