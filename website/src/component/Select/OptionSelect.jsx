import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function OptionSelect({ option, label, name, noneValue = true, dfValue = '', handleGetContent}) {
  const [age, setAge] = React.useState(dfValue);

  const handleChange = (event) => {
    handleGetContent ? handleGetContent(event.target.value) : null;
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        name={name}
        labelId={`${name}-label`}
        id={name}
        value={age}
        label={label}
        onChange={handleChange}
      >
        {noneValue ? <MenuItem value="">
          <em>None</em>
        </MenuItem> : null}
        {option.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
OptionSelect.protoType = {
  option: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  noneValue: PropTypes.bool,
  dfValue: PropTypes.string,
  handleGetContent: PropTypes.func
};