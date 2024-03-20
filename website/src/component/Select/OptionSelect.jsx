import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function OptionSelect({ handle, option, label }) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        handle(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label={label}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
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
    handle: PropTypes.func.isRequired,
    option: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
}