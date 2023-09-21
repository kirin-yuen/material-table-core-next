import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const DEFAULT_FORMAT = 'DD/MM/YYYY';

export default function OverrideDatePicker(props) {
  const { onChange, size, fullWidth, helperText, error } = props;
  let { value } = props;

  value = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3');

  const mergeProps = {
    value,
    onChange: (tValue) => onChange(dayjs(tValue).format(DEFAULT_FORMAT)),
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableMaskedInput
        inputFormat={DEFAULT_FORMAT}
        {...mergeProps}
        renderInput={(params) => (
          <TextField {...params} {...{ size, fullWidth, helperText, error }} />
        )}
      />
    </LocalizationProvider>
  );
}
