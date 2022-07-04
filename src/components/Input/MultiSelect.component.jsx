import React from "react";
import Select from "react-select";

const MultiSelectComponent = (props) => {
  const listsOption = props?.option.map((e, index) => {
    return { value: e?.name, label: e?.name };
  });
  return (
    <Select
      isMulti
      name="colors"
      options={listsOption}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={{ padding: "10px !important" }}
      placeholder="Ngành nghề"
      onChange={props.handleChangeInput}
    />
  );
};

export default MultiSelectComponent;
