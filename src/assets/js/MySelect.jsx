import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
    image: 'https://scribespace-dev.web.app/assets/icon/logo.svg',
  },
  {
    label: 'Option 2',
    value: 'option2',
    image: 'https://scribespace-dev.web.app/assets/icon/logo.svg',
  },
  {
    label: 'Option 3',
    value: 'option3',
    image: 'https://scribespace-dev.web.app/assets/icon/logo.svg',
  },
];

const renderOption = ({ label, image }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={image} alt={label} width="50" height="50" />
    <span style={{ marginLeft: 10 }}>{label}</span>
  </div>
);

const MySelect = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
    
      <Select
        labelId="demo-select-label"
        id="demo-select"
        value={value}
        onChange={handleChange}
        renderOption={renderOption}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {renderOption(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MySelect;
