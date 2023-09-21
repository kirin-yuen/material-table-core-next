import { MenuItem, TextField } from '@mui/material';

export default function OverrideSelect(props) {
  const {
    onChange,
    columnDef: { lookup },
  } = props;

  const mergeProps = {
    ...props,
    onChange: (e) => onChange(e.target.value),
    select: true,
  };

  return (
    <TextField {...mergeProps}>
      {Object.entries(lookup).map(([optValue, optLabel]) => (
        <MenuItem key={optValue} value={optValue}>
          {optLabel}
        </MenuItem>
      ))}
    </TextField>
  );
}
