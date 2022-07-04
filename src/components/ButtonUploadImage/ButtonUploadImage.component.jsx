import React, { useState, useEffect } from "react";
import "./uploadButton.css";
export default function ButtonUploadImageComponent(props) {
  return (
    <div className="box">
      <div className="js--image-preview">
        <img src={props.img} alt="" />
      </div>
      <div className="upload-options">
        <label>
          <input
            type="file"
            className="image-upload"
            multiple
            onChange={props.addImage}
            name={props?.name}
          />
        </label>
      </div>
    </div>
  );
}
