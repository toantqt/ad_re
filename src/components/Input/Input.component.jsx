import React from "react";
import TextField from "@material-ui/core/TextField";
import "./input.css";
const InputComponent = (props) => {
  return (
    <TextField
      id="outlined-basic"
      label={props.title}
      variant="outlined"
      className="input-text"
      name={props.name}
      onChange={props.handleChangeInput}
    />
  );
};

export default InputComponent;
