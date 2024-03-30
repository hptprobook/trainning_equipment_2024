import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function OptionSelect({  option, label, name, noneValue = true }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        name={name}
        labelId="demo-select-small-label"
        id="demo-select-small"
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
};