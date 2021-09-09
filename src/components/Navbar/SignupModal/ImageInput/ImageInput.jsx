import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./ImageInput.css";
import { useEffect } from "react";

const ImageInput = (props) => {
  const { Image, setImage, placeholder } = props;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="image-input-container">
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={onImageChange}
      />
      <label htmlFor="raised-button-file" className="image__upload__label">
        <Button component="span">Upload</Button>
      </label>
      <div className="image__upload__preview">
        {console.log(typeof Image == typeof "")}
        <img
          src={
            Image
              ? typeof Image == typeof ""
                ? Image
                : URL.createObjectURL(Image)
              : placeholder
          }
          alt=""
          className="image__upload__elem"
        />
      </div>
    </div>
  );
};

export default ImageInput;
