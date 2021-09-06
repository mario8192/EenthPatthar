import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./ImageInput.css";

const ImageInput = (props) => {
  const [image, setImage] = React.useState(null);
  const { ImageURL, setImageURL } = props;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    // upload logic goes here
  };

  return (
    <div>
      <input
        accept="image/*"
        // className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={onImageChange}
      />
      <label htmlFor="raised-button-file" className="image__upload__label">
        <Button
          // variant="raised"
          component="span"
          //   className={classes.button}
        >
          Upload
        </Button>
        <div
          className="image__upload__preview"
          style={{ backgroundImage: image }}
        />
      </label>
    </div>
  );
};

export default ImageInput;
