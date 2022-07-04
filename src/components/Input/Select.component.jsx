import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
const SelectComponent = (props) => {
  const listsOption = props?.option?.map((e, index) => {
    return (
      <option
        value={
          e.scale ||
          e.type ||
          e.field ||
          e.name ||
          e.salary ||
          e.experience ||
          e.level ||
          e.type ||
          e.gender ||
          e.location
        }
      >
        {e.scale ||
          e.type ||
          e.field ||
          e.name ||
          e.salary ||
          e.experience ||
          e.level ||
          e.type ||
          e.gender ||
          e.location}
      </option>
    );
  });
  return (
    <FormControl variant="outlined" className="input-select">
      <InputLabel htmlFor="outlined-age-native-simple">
        {props.title}
      </InputLabel>
      <Select
        native
        // value={state.age}
        onChange={props.handleChangeInput}
        label={props.title}
        inputProps={{
          name: props?.name,
          id: "age-native-simple",
        }}
      >
        <option aria-label="None" value="" />
        {listsOption}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
