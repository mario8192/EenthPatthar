import React, { useState, useEffect } from "react";
import { tokenHeader } from "../../services/HeaderService";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import ImageInput from "../Navbar/SignupModal/ImageInput/ImageInput";
import UploadImage from "../../services/ImageUploadService";
import "./AdForm.css";

export default function AdForm() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [bhk, setBhk] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [Image, setImage] = useState("");

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== undefined) {
      setId(location.state.p_id);
      setTitle(location.state.p_title);
      setType(location.state.p_type);
      setDesc(location.state.p_desc);
      setBhk(location.state.p_bhk);
      setArea(location.state.p_area);
      setCity(location.state.p_city);
      setPrice(location.state.p_price);
      setImage(location.state.p_image);
    }
  }, [location.state]);

  const defaultPicURL =
    "https://static.vecteezy.com/system/resources/previews/000/097/764/original/free-house-vector.png";

  const getuploadedUrl = async () => {
    let imageURL = defaultPicURL;
    if (typeof Image != typeof "") {
      try {
        imageURL = await UploadImage(Image, "property");
      } catch (err) {
        console.log(err);
      }
    }
    return imageURL;
  };

  const clearInputs = () => {
    setTitle("");
    setType("");
    setDesc("");
    setBhk("");
    setArea("");
    setCity("");
    setPrice("");
    setImage("");
  };

  const createAd = async (e) => {
    e.preventDefault();
    let reqData = {
      property_details: {
        property_title: title,
        property_type: type,
        description: desc,
        n_bhk: bhk,
      },
      address: {
        city: city,
        area_details: area,
      },
      quoted_price: price,
      image: await getuploadedUrl(),
    };
    let structure = {
      method: "post",
      url: process.env.REACT_APP_SERVER_URL + "/advertisement",
      headers: tokenHeader(),
      data: reqData,
    };
    try {
      const res = await axios(structure);
      console.log(res);
      alert("Advertisement Published");
      clearInputs();
      history.push("/myprofile");
    } catch (err) {
      alert(err.message);
    }
  };

  const updateAd = async (e) => {
    e.preventDefault();
    console.log(typeof Image == typeof "");
    let reqData = {
      _id: id,
      property_details: {
        property_title: title,
        property_type: type,
        description: desc,
        n_bhk: bhk,
      },
      address: {
        city: city,
        area_details: area,
      },
      quoted_price: price,
      image: typeof Image == typeof "" ? Image : await getuploadedUrl(),
    };

    let structure = {
      method: "put",
      url: process.env.REACT_APP_SERVER_URL + "/advertisement",
      headers: tokenHeader(),
      data: reqData,
    };
    try {
      console.log(structure);
      const res = await axios(structure);
      console.log(res);
      alert("Advertisement Updated!");
      clearInputs();
      history.push("/myprofile");
    } catch (err) {
      alert(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = !id ? await createAd(e) : await updateAd(e);
    console.log(response);
  };

  return (
    <div className="post__ad__form">
      <div className="container mt-5">
        <div>
          <form onSubmit={submitHandler}>
            <div>
              <h2 style={{ textAlign: "center" }}>
                {" "}
                {!id ? `Post` : `Update`} your Advertisement!
              </h2>
            </div>
            <div>
              <label className="form-label">Property Details</label>
              <div className="form-group row">
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Property Title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    required
                  ></input>
                </div>
                <div className="col-sm-6">
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    required
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    value={type}
                    defaultValue={""}
                  >
                    <option value="">Property Type...</option>
                    <option value="Flat">Flat</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Villa">Villa</option>
                    <option value="Bare Land">Bare Land</option>
                  </select>

                  {/* <input
                    className="form-control"
                    type="dropdown"
                    placeholder="Property Type"
                    onChange={typeHandler}
                    value={type}
                    required
                  ></input> */}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Property Description"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    value={desc}
                    required
                  ></textarea>
                </div>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Number of BHKs"
                    onChange={(e) => {
                      setBhk(e.target.value);
                    }}
                    value={bhk}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Location Details</label>
              <div className="form-group row">
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address - Area details"
                    onChange={(e) => {
                      setArea(e.target.value);
                    }}
                    value={area}
                    required
                  ></input>
                </div>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    value={city}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Quoted Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    value={price}
                    required
                  ></input>
                </div>
                <div className="col-sm-6">
                  {/* <input className="form-control-file" type="file" placeholder="Upload images of the property"></input> */}
                  <div className="input-label">Property image</div>
                  <ImageInput
                    Image={Image}
                    setImage={setImage}
                    placeholder={defaultPicURL}
                  />
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }} className="mt-4">
              <button type="submit" className="btn btn-outline-primary">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
