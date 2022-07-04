import React from "react";

const InputDateComponent = (props) => {
  return (
    <input
      type="date"
      className="input-date form-control"
      name={props?.name}
      onChange={props?.handleChangeInput}
    />
  );
};

export default InputDateComponent;
