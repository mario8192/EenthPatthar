import React, { Component } from "react";
import "./Loader.css";

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loading-bg">
        <div class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  );
};

export default Loader;
